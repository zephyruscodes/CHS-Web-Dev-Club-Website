 # CHS Web Development Club Website

 Welcome to the CHS Web Development Club website repository — updated to include improved animations, a hero photo, and Tailwind-styled interactive elements.

 ## 🌟 Highlights (recent updates)

- Animated blue↔gold gradient for the main title and tagline (smooth GPU-friendly animation)
- Animated, shiny `Join the Club` call-to-action with hover lift and moving sheen
- Club-members hero photo placed behind the landing content for a rich hero background (`images/ClubMembers.png`)
- Circular logo in the navbar with an animated gradient site title
- Tactile / 3D-looking navbar links implemented with Tailwind utility classes
- Scroll reveal changed to use transitions (keeps element-specific animations intact)

 ## 📋 Sections

 - Home: Hero with animated title, tagline, CTA, and club photo
 - About: Club goals and membership info
 - Projects: Showcase of member work
 - Leaders: Team profiles
 - Contact: Email & social links

 ## Project Structure

 ```
 .
 ├── index.html          # Main HTML with inline styles and content
 ├── something.js        # Interactive JavaScript (scroll reveal, cursor light, timeline)
 ├── images/             # Image assets (logo, ClubMembers.png, project screenshots)
 └── README.md           # This file
 ```

 ## Technologies

 - HTML5, CSS3 (inline in `index.html`), Vanilla JavaScript
 - Tailwind CSS (CDN) for utility classes

 ## Local Preview

 Run a simple file server from the project root and open the page in your browser:

 ```bash
 python -m http.server 8000
 # then open http://localhost:8000
 ```

 ## Notes for Contributors

 - Images with spaces in filenames can be referenced directly but consider renaming to hyphenated filenames (e.g., `club-members.png`) for portability.
 - The page intentionally uses some inline styles and a small amount of inline CSS to keep the demo compact — feel free to extract to `style.css` as you modularize.
 - Tailwind is included via CDN for quick prototyping; replace with a build step if you want a production bundle.

 ## Meeting Info

 **Meetings**: Gold Wednesdays, room F105

 ## Contact

 chswebdevclub@gmail.com

 ---

 **Created and Maintained by ZephyrusCodes**
