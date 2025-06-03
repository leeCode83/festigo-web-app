'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt, FaCommentAlt } from 'react-icons/fa';
import Navbar from '@/components/layout/Navbar';
import ReviewSection from '@/components/events/ReviewSection';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Thread {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  username: string;
  _count?: {
    replies: number;
  };
}

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'past' | 'ongoing';
  ticketUrl: string;
  price: string;
  organizer: string;
  reviews: Review[];
  threads: Thread[];
}

export default function EventDetail() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'past' | 'ongoing'>('upcoming');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/event/${params.id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const eventData = await response.json();
      setEvent(eventData);

      // Determine event status
      const eventDate = new Date(`${eventData.date} ${eventData.time}`);
      const now = new Date();
      const status = eventDate > now ? 'upcoming' : (eventDate.getDate() === now.getDate() ? 'ongoing' : 'past');
      setEventStatus(status);
    } catch (err) {
      console.error('Error fetching event details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [params.id]);

  const calculateAverageRating = (reviews: Review[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        <Navbar />
        <div className={styles.errorContainer}>
          <div className={styles.error}>Event not found</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        
        <div className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image
              src={event.image}
              alt={event.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{event.title}</h1>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About This Event</h2>
              <p className={styles.description}>{event.description}</p>
            </section>

            <ReviewSection
              eventId={event.id}
              reviews={event.reviews || []}
              averageRating={calculateAverageRating(event.reviews)}
              totalReviews={event.reviews?.length || 0}
              onReviewSubmitted={() => {
                // Refresh event data after new review
                fetchEventDetails();
              }}
              eventStatus={eventStatus}
            />

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Discussions</h2>
              
              <div className={styles.threadList}>
                {(!event.threads || event.threads.length === 0) ? (
                  <p className={styles.noThreads}>No discussions yet. Be the first to start a discussion!</p>
                ) : (
                  event.threads.map((thread) => (
                    <Link href={`/discussions/${thread.id}`} key={thread.id} className={styles.threadLink}>
                      <div className={styles.threadItem}>
                        <h3 className={styles.threadTitle}>{thread.title}</h3>
                        <p className={styles.threadContent}>{thread.content.length > 150 ? `${thread.content.substring(0, 150)}...` : thread.content}</p>
                        <div className={styles.threadMeta}>
                          <span><FaCommentAlt className={styles.threadIcon} /> {thread._count?.replies || 0} replies</span>
                          <span>By {thread.username}</span>
                          <span>{format(new Date(thread.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
              <form
                className={styles.discussionForm}
                onSubmit={async (e: FormEvent) => {
                  e.preventDefault();
                  if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) return;
                  
                  try {
                    setIsSubmitting(true);
                    const token = Cookies.get('token');
                    if (!token) {
                      alert('Please login to create a discussion');
                      return;
                    }
                    
                    // Check if token is expired
                    try {
                      const payload = JSON.parse(atob(token.split('.')[1]));
                      if (Date.now() >= payload.exp * 1000) {
                        Cookies.remove('token');
                        Cookies.remove('username');
                        alert('Your session has expired. Please login again.');
                        return;
                      }
                    } catch {
                      alert('Invalid session. Please login again.');
                      return;
                    }

                    const response = await fetch('http://localhost:3001/discussions', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        eventId: Number(params.id),
                        title: newDiscussion.title,
                        content: newDiscussion.content
                      })
                    });

                    if (!response.ok) throw new Error('Failed to create discussion');

                    setNewDiscussion({ title: '', content: '' });
                    fetchEventDetails(); // Refresh discussions list
                  } catch (err) {
                    console.error('Error creating discussion:', err);
                    alert('Failed to create discussion. Please try again.');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Discussion Title"
                    className={styles.input}
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    placeholder="Share your thoughts..."
                    className={styles.textarea}
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Start Discussion'}
                </button>
              </form>
            </section>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.eventInfo}>
              <div className={styles.infoItem}>
                <FaCalendarAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Date</div>
                  <div className={styles.infoValue}>
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaClock className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Time</div>
                  <div className={styles.infoValue}>{event.time}</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>{event.location}</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaTicketAlt className={styles.icon} />
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Price</div>
                  <div className={styles.infoValue}>{event.price}</div>
                </div>
              </div>

              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookButton}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}