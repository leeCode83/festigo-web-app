# Sample Events for Testing

Here are 10 sample events in JSON format that can be used to test the create event API endpoint. These events cover various categories including music concerts, food festivals, art exhibitions, and sports events.

```json
[
  {
    "category": "Music",
    "title": "Jakarta Jazz Festival 2025",
    "description": "Annual jazz music festival featuring local and international jazz musicians",
    "date": "2025-07-15T19:00:00.000Z",
    "location": "JIExpo Kemayoran, Jakarta",
    "image": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    "ticketUrl": "https://ticketing.com/jakarta-jazz-2025"
  },
  {
    "category": "Food",
    "title": "Culinary Night Market",
    "description": "Experience the best street food from across Indonesia",
    "date": "2025-06-20T16:00:00.000Z",
    "location": "Gelora Bung Karno, Jakarta",
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7",
    "ticketUrl": "https://ticketing.com/culinary-night-2025"
  },
  {
    "category": "Art",
    "title": "Contemporary Art Exhibition",
    "description": "Showcasing works from emerging Indonesian artists",
    "date": "2025-08-05T10:00:00.000Z",
    "location": "Museum MACAN, Jakarta",
    "image": "https://images.unsplash.com/photo-1531913764164-f85c52e6e654",
    "ticketUrl": "https://ticketing.com/art-exhibition-2025"
  },
  {
    "category": "Sports",
    "title": "Jakarta Marathon 2025",
    "description": "Annual international marathon through Jakarta's iconic landmarks",
    "date": "2025-09-25T05:00:00.000Z",
    "location": "Monas, Jakarta",
    "image": "https://images.unsplash.com/photo-1530549387789-4c1017266635",
    "ticketUrl": "https://ticketing.com/jakarta-marathon-2025"
  },
  {
    "category": "Technology",
    "title": "Tech Innovation Summit",
    "description": "Conference showcasing latest technology trends and innovations",
    "date": "2025-10-12T09:00:00.000Z",
    "location": "ICE BSD City, Tangerang",
    "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    "ticketUrl": "https://ticketing.com/tech-summit-2025"
  },
  {
    "category": "Music",
    "title": "Rock in Bali",
    "description": "International rock music festival on the beach",
    "date": "2025-08-30T18:00:00.000Z",
    "location": "Kuta Beach, Bali",
    "image": "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
    "ticketUrl": "https://ticketing.com/rock-in-bali-2025"
  },
  {
    "category": "Culture",
    "title": "Traditional Dance Festival",
    "description": "Celebration of Indonesian traditional dances",
    "date": "2025-07-25T15:00:00.000Z",
    "location": "Prambanan Temple, Yogyakarta",
    "image": "https://images.unsplash.com/photo-1535525153412-5a42439a210d",
    "ticketUrl": "https://ticketing.com/dance-festival-2025"
  },
  {
    "category": "Food",
    "title": "Coffee and Tea Expo",
    "description": "Exhibition of Indonesia's finest coffee and tea producers",
    "date": "2025-11-05T10:00:00.000Z",
    "location": "Senayan City, Jakarta",
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "ticketUrl": "https://ticketing.com/coffee-expo-2025"
  },
  {
    "category": "Entertainment",
    "title": "Comic Con Indonesia",
    "description": "Convention for comic, anime, and pop culture enthusiasts",
    "date": "2025-09-15T09:00:00.000Z",
    "location": "Jakarta Convention Center",
    "image": "https://images.unsplash.com/photo-1535016120720-40c646be5580",
    "ticketUrl": "https://ticketing.com/comic-con-2025"
  },
  {
    "category": "Education",
    "title": "International Education Fair",
    "description": "Exhibition featuring universities from around the world",
    "date": "2025-10-20T08:00:00.000Z",
    "location": "Balai Kartini, Jakarta",
    "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    "ticketUrl": "https://ticketing.com/edu-fair-2025"
  }
]
```

Each event follows the required DTO structure with:
- category
- title
- description
- date (in ISO 8601 format)
- location
- image (URL)
- ticketUrl (URL)

All dates are set in the future (2025) to ensure they are valid upcoming events.
