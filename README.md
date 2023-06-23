# mattspigs!

# what/why?
This is a website I created before attending Hack Reactor using only HTML, CSS, and Javascript. The primary purpose of this site was as a learning experience, I wanted to make something I was proud of and that I could show to people I know; and what better to show off than your pets?

# Personal Takeaways
The creation of this site has taugh me so much, I won't be able to list everything, but I'll list some of the big ones.<br>
The site is build without any front end framework, at the time this was all I knew, but looking back the lack of a framework made the work so much more tedious. I spent dozens of hours more than I needed to, probably. Every effect is achieved through adding and removing classes manually, selecting elements, transforming, hiding, etc. <br>
<br>
Early on I decided I wanted to have a photo gallary. Without the ability to read from files, though this process became very tricky. If you look at the script code for the image gallery I pretty much came up with my own version of react by creating image elements based on the number of images in the gallery, each image would use its index to load a file which was named with its index (something like gallery_imgs_webp/800/gal_img_800(${i}).webp). This would be a lot easier with something like Node, but I think this is an inventive solution, and shoot, it works!<br>
<br>
Another issue with the photo gallery which I hadn't anticipated was the loading times. This was a new problem for me at the time, and I learned a ton about optimization while making this site. My first itterations were all using full size images from a late model Iphone, i.e. way too big... I reallly went ham on this one, though, by creating multiple sizes for each image and choosing which to render in the page by the screen size. I also learned about the types of files and which were more efficient. I learned about CDN's, too, and I emulated that service locally, loading sizes based on what was being done and the size of the display.<br>
<br>
Responsiveness was also very important. This was my first attempt at making something that could be reasonably viewed on a phone or tablet. I didn't know much about this before this project but by the end of it I had a very solid foundation using media queries to essentially render different versions of the site depending on the size of the display. While working on the site I learned how to hook my phone up to my laptop in developer mode to test out the touch effects. This allowed for me to make it so a user could swipe through images in the gallery rather than hitting a button (which would reduce the size of the image). At the end of the production run, I'd have to say that the CSS required to make this site responsive took up at least as much time as the initial creation of the site for desktop.<br>
<br>
In a similar vein to the responsiveness, I wanted to ensure that the website looked good on all devices. While showing some of my friends at work I noticed that on different phones and different browsers the site could look quite different, espectially true with fonts and high hpixel density displays. This lead me to using 3rd party websites to run my site, just so I could ensure the best possible experience no matter the browser or opperating system.<br>
<br>
Finally, the first itteration of this site (just HTML and CSS) which I had done previously, taught me about hosting and domains. I did include a link in the original version of this site so that I can look back at the progress I'd made.<br>

Despite the tedium, I would say that this site has served as a very solid foundation for my Javascript skills. As far removed as I am from the production of this site, I can still be proud of the end product.

## Site Viewable at: <br>
https://mattspigs.com/
