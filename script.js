/* ======================================
   EVENING PAGE
====================================== */

const morningButton =
    document.getElementById("morningButton");

const morningMessage =
    document.getElementById("morningMessage");

const finalButton =
    document.getElementById("finalButton");


if (morningButton && morningMessage) {

    morningButton.addEventListener("click", () => {

        /* Start music when user interacts */
        startBackgroundMusic();

        morningMessage.style.display =
            "block";


        setTimeout(() => {

            morningMessage.style.opacity =
                "1";

            morningMessage.style.transform =
                "translateY(0)";

        }, 50);


        setTimeout(() => {

            document
                .querySelectorAll(".message-line")
                .forEach(line => {

                    line.style.width =
                        "80px";

                });

        }, 300);


        morningButton.style.display =
            "none";


        if (finalButton) {

            setTimeout(() => {

                finalButton.style.display =
                    "inline-block";

            }, 1400);

        }

    });

}


/* ======================================
   BACKGROUND MUSIC
====================================== */

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );


function startBackgroundMusic() {

    if (!backgroundMusic) return;


    /*
       Keep your original volume.
    */

    backgroundMusic.volume =
        0.04;


    /*
       Don't restart music if
       it is already playing.
    */

    if (!backgroundMusic.paused) {
        return;
    }


    const playPromise =
        backgroundMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                console.log(
                    "Background music started."
                );

            })
            .catch((error) => {

                console.log(
                    "Music playback blocked:",
                    error
                );

            });

    }

}


/* ======================================
   MUSIC START
====================================== */

if (backgroundMusic) {

    backgroundMusic.volume =
        0.04;


    /*
       Try normal autoplay.
    */

    window.addEventListener(
        "load",
        () => {

            startBackgroundMusic();

        }
    );


    /*
       Mobile fallback.

       A real touch/pointer interaction
       gives the browser permission to
       start audio.
    */

    document.addEventListener(
        "pointerdown",
        startBackgroundMusic,
        { once: true }
    );

}


/* ======================================
   FINAL AUDIO
====================================== */

const finalAudio =
    document.getElementById(
        "finalAudio"
    );


if (finalAudio) {

    finalAudio.volume =
        1.0;

}


/* ======================================
   TYPEWRITER
====================================== */

const typewriterTexts =
    document.querySelectorAll(
        ".typewriter-text"
    );

let currentText = 0;


function typeParagraph(
    element,
    callback
) {

    const text =
        element.textContent.trim();


    element.textContent =
        "";


    element.style.visibility =
        "visible";


    let index = 0;


    function type() {

        if (index < text.length) {

            element.textContent +=
                text.charAt(index);


            index++;


            setTimeout(
                type,
                45
            );

        } else {

            setTimeout(
                callback,
                700
            );

        }

    }


    type();

}


function startTypewriter() {

    if (
        currentText >=
        typewriterTexts.length
    ) {

        return;

    }


    typeParagraph(

        typewriterTexts[currentText],

        () => {

            currentText++;

            startTypewriter();

        }

    );

}


if (
    typewriterTexts.length > 0
) {

    window.addEventListener(
        "load",
        () => {

            startTypewriter();

        }
    );

}


/* ======================================
   NIGHT SKY STARS
====================================== */

const starsContainer =
    document.querySelector(
        ".stars"
    );


if (starsContainer) {

    const numberOfStars =
        220;


    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement(
                "div"
            );


        star.classList.add(
            "star"
        );


        star.style.left =
            Math.random() *
            100 +
            "%";


        star.style.top =
            Math.random() *
            100 +
            "%";


        const size =
            1 +
            Math.random() *
            2.5;


        star.style.width =
            size +
            "px";


        star.style.height =
            size +
            "px";


        star.style.animationDelay =
            Math.random() *
            5 +
            "s";


        star.style.animationDuration =
            2 +
            Math.random() *
            5 +
            "s";


        star.style.opacity =
            0.3 +
            Math.random() *
            0.7;


        starsContainer.appendChild(
            star
        );

    }

}


/* ======================================
   FULL SCREEN MOVING GALAXY
====================================== */

const galaxy =
    document.querySelector(
        ".galaxy"
    );


if (galaxy) {

    const galaxyStars =
        700;


    const stars = [];


    const screenWidth =
        window.innerWidth;


    const screenHeight =
        window.innerHeight;


    const centerX =
        screenWidth / 2;


    const centerY =
        screenHeight / 2;


    const maxRadius =
        Math.sqrt(
            centerX * centerX +
            centerY * centerY
        );


    /* ==================================
       CREATE GALAXY STARS
    ================================== */

    for (
        let i = 0;
        i < galaxyStars;
        i++
    ) {

        const star =
            document.createElement(
                "div"
            );


        star.classList.add(
            "galaxy-star"
        );


        const radius =
            Math.sqrt(
                Math.random()
            ) *
            maxRadius;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            (
                0.0025 +
                Math.random() *
                0.003
            ) *
            (
                1 -
                radius /
                maxRadius
            );


        const size =
            0.5 +
            Math.random() *
            2;


        star.style.width =
            `${size}px`;


        star.style.height =
            `${size}px`;


        star.style.opacity =
            0.2 +
            Math.random() *
            0.8;


        galaxy.appendChild(
            star
        );


        stars.push({

            element:
                star,

            radius:
                radius,

            angle:
                angle,

            speed:
                speed,

            verticalScale:
                0.45 +
                Math.random() *
                0.15

        });

    }


    /* ==================================
       ANIMATE GALAXY
    ================================== */

    function animateGalaxy() {

        stars.forEach(
            star => {

                star.angle +=
                    star.speed;


                const x =
                    Math.cos(
                        star.angle
                    ) *
                    star.radius;


                const y =
                    Math.sin(
                        star.angle
                    ) *
                    star.radius *
                    star.verticalScale;


                star.element.style.transform =
                    `translate3d(
                        ${centerX + x}px,
                        ${centerY + y}px,
                        0
                    ) translate(-50%, -50%)`;

            }
        );


        requestAnimationFrame(
            animateGalaxy
        );

    }


    requestAnimationFrame(
        animateGalaxy
    );

}


/* ======================================
   FINAL PAGE BUTTON
====================================== */

if (finalButton) {

    finalButton.addEventListener(
        "click",
        () => {

            startBackgroundMusic();

            window.location.href =
                "final.html";

        }
    );

}


/* ======================================
   FINAL PAGE — INDEPENDENT TEXT
====================================== */

const finalMessage =
    document.getElementById(
        "finalMessage"
    );


if (finalMessage) {

    const messages = [

        "I just wanted you to know that you mean so much to me. ❤️",

        "Jana karibu nikukufie tena.🤭",

        "So I decided to tell you of how beautiful you are. 🌹",

        "Najua unachukia kusoma vitu refu, lakini unaeza kataa yangu kweli. 🥺❤️",

        "Thank you beautiful, you put a smile on my face.😘",

        "Have a lovely morning, Honeypie. ❤️"

    ];


    let messageIndex = 0;


    setInterval(() => {

        finalMessage.style.opacity =
            "0";


        finalMessage.style.transform =
            "translateY(12px)";


        setTimeout(() => {

            messageIndex++;


            if (
                messageIndex >=
                messages.length
            ) {

                messageIndex = 0;

            }


            finalMessage.textContent =
                messages[messageIndex];


            finalMessage.style.opacity =
                "1";


            finalMessage.style.transform =
                "translateY(0)";

        }, 800);

    }, 5000);

}

