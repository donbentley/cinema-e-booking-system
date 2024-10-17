# Cinema E-Booking System

## Project Description

- uhhhh

## Features

- uhhh

## Technologies Used

- **Backend:** Java, Spring Boot, Spring Data JPA, MySQL
- **Frontend:** HTML, CSS, JavaScript, Axios, Express.js, Node
- **Database:** MySQL
- **Build Tool:** Maven

---

## Prerequisites

Before setting up the project, ensure that you have the following installed:

- [Java JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- [Apache Maven](https://maven.apache.org/install.html)
- [MySQL](https://dev.mysql.com/downloads/installer/)

---

### Clone the Repository

```bash
git clone https://github.com/your-username/cinema-e-booking.git
cd cinema-e-booking
```

---

### Compile and Run

start RESTAPI backend

#### backend:

```bash
cd backend
mvn clean install
mvn clean compile
mvn spring-boot:run
```

hosted on https://localhost:8080

#### frontend

start frontend server

```
cd frontend
node server.js
```

 hosted on https://localhost:3000

 ---
### routes
```
add: http://localhost:8080/movie/addNew
getAll: http://localhost:8080/movie/getAll
getById: http://localhost:8080/movie/get/:id
update: http://localhost:8080/movie/update/:id
delete: http://localhost:8080/movie/delete/:id
```
### raw movie data
```
[
  {
    "id": 1,
    "title": "Deadpool",
    "category": "Action",
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman"
    ],
    "director": "Shawn Levy",
    "producer": "Kevin Feige",
    "synopsis": "Marvel Studios' \"Deadpool & Wolverine\" delivers the ultimate team-up throwdown on July 26.",
    "reviewLink": "https://www.rottentomatoes.com/m/deadpool_and_wolverine",
    "pictureLink": "https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg&f=1&h=500",
    "trailerLink": "https://www.youtube.com/watch?v=qVoN8v71I8I",
    "mpaaRating": "R"
  },
  {
    "id": 2,
    "title": "Bad Genius",
    "category": "Suspense",
    "cast": [
      "Taylor Hickson",
      "Callina Liang",
      "Jabari Banks"
    ],
    "director": "J.C. Lee",
    "producer": "Erik Feig",
    "synopsis": "A group of seniors of an entrepreneurial high school team up to take down a rigged college admission system.",
    "reviewLink": "https://www.rottentomatoes.com/m/bad_genius_2024",
    "pictureLink": "https://i.ytimg.com/vi/I87KNW1TtOc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCJuw3fXd5GuUdBN66tP-9B8n33jg",
    "trailerLink": "https://youtu.be/0XryxGl8ZNQ?si=hskx5ccYloQPlUx-",
    "mpaaRating": "PG-13"
  },
  {
    "id": 3,
    "title": "Alien: Romulus",
    "category": "Horror",
    "cast": [
      "Cailee Spaeny",
      "David Jonsson",
      "Archie Renaux"
    ],
    "director": "Fede Alvarez",
    "producer": "Walter Hill",
    "synopsis": "While scavenging the deep ends of a derelict space station, a group of young space colonists come face to face with the most terrifying life form in the universe.",
    "reviewLink": "https://www.rottentomatoes.com/m/alien_romulus",
    "pictureLink": "https://i0.wp.com/scifi.radio/wp-content/uploads/2024/06/alien-romulus-gets-new-posters-with-and-without-the-alien-v0-sjyhy5l8ak4d1.webp?resize=1280%2C640&ssl=1",
    "trailerLink": "https://youtu.be/GTNMt84KT0k?si=gCBg7LljiZEPWhek",
    "mpaaRating": "R"
  },
  {
    "id": 4,
    "title": "REAGAN",
    "category": "Drama",
    "cast": [
      "Dennis Quaid",
      "Penelope Ann Miller",
      "Jon Voight"
    ],
    "director": "Sean McNamara",
    "producer": "Joel Falderon",
    "synopsis": "REAGAN is a cinematic journey from small-town roots to global fame, told through the perspective of former KGB agent Viktor Petrovich, whose life intertwines with Ronald Reagan's. With Dennis Quaid as Reagan.",
    "reviewLink": "https://www.rottentomatoes.com/m/reagan_2024",
    "pictureLink": "https://images.fandango.com/ImageRenderer/820/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/236425/REAGAN-Poster.jpg",
    "trailerLink": "https://www.youtube.com/watch?v=njLPMG8qZ5M",
    "mpaaRating": "PG-13"
  },
  {
    "id": 5,
    "title": "Speak No Evil",
    "category": "Horror",
    "cast": [
      "James McAvoy",
      "Mackenzie Davis",
      "Scoot McNairy"
    ],
    "director": "James Watkins",
    "producer": "Jason Blum",
    "synopsis": "A family is invited to spend a whole weekend in a lonely home in the countryside, but as the weekend progresses, they realize that a dark side lies within the family who invited them.",
    "reviewLink": "https://www.rottentomatoes.com/m/speak_no_evil_2024",
    "pictureLink": "https://upload.wikimedia.org/wikipedia/en/9/9f/Speak_No_Evil_%282024%29_Theatrical_Poster.jpeg",
    "trailerLink": "https://youtu.be/INHM--6XQzQ?si=q0HOXXTCLYMf0pAB",
    "mpaaRating": "R"
  },
  {
    "id": 6,
    "title": "A Minecraft Movie",
    "category": "Action",
    "cast": [
      "Emma Myers",
      "Jack Black",
      "Danielle Brooks"
    ],
    "director": "Jared Hess",
    "producer": "Roy Lee",
    "synopsis": "Four misfits find themselves struggling with ordinary problems when they were suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination.",
    "reviewLink": "https://www.rottentomatoes.com/m/a_minecraft_movie",
    "pictureLink": "https://i.ytimg.com/vi/4jyRlcNSvUo/maxresdefault.jpg",
    "trailerLink": "https://youtu.be/4jyRlcNSvUo",
    "mpaaRating": "PG-13"
  },
  {
    "id": 7,
    "title": "Beetlejuice Beetlejuice",
    "category": "Horror/Comedy",
    "cast": [
      "Michael Keaton",
      "Winona Ryder",
      "Jenna Ortega"
    ],
    "director": "Tim Burton",
    "producer": "Pete Chiappetta",
    "synopsis": "After a family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Beetlejuice, Lydia's life is turned upside down when her teenage daughter, Astrid, accidentally opens the portal to the Afterlife.",
    "reviewLink": "https://www.rottentomatoes.com/m/beetlejuice_beetlejuice",
    "pictureLink": "https://media-cdn.socastsrm.com/wordpress/wp-content/blogs.dir/3094/files/2024/05/beetlejuice-2.jpg",
    "trailerLink": "https://youtu.be/BqnAeUoqFAM?si=SAsHXwwM7dV_Epac",
    "mpaaRating": "PG-13"
  }
]
```