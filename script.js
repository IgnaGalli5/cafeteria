document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")
  
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active")
  
      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
  
      // Burger Animation
      burger.classList.toggle("toggle")
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
  
        // Close mobile menu if open
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active")
          burger.classList.remove("toggle")
          navLinks.forEach((link) => {
            link.style.animation = ""
          })
        }
      })
    })
  
    // Simple form validation
    const form = document.getElementById("contact-form")
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        // Here you would typically send the form data to a server
        alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
        form.reset()
      })
    }
  
    // Gallery functionality
    const galleryModal = document.getElementById("gallery-modal")
    const galleryFullImage = document.getElementById("gallery-full-image")
    const prevImageBtn = document.getElementById("prev-image")
    const nextImageBtn = document.getElementById("next-image")
    let currentCategory = ""
    let currentIndex = 0
    let currentImages = []
  
    // Collect all gallery images, including those inside product containers
    const galleryImages = [
      ...document.querySelectorAll(".gallery-image-container img"),
      ...document.querySelectorAll(".product-image-container img"),
    ]
  
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        currentCategory = img.getAttribute("data-category")
        // Filter images by category
        currentImages = galleryImages.filter((image) => image.getAttribute("data-category") === currentCategory)
        currentIndex = currentImages.indexOf(img)
        updateGalleryModal()
        galleryModal.style.display = "block"
      })
    })
  
    function updateGalleryModal() {
      if (currentImages.length > 0 && currentIndex >= 0 && currentIndex < currentImages.length) {
        galleryFullImage.src = currentImages[currentIndex].getAttribute("data-full") || currentImages[currentIndex].src
        galleryFullImage.alt = currentImages[currentIndex].alt
      }
    }
  
    if (prevImageBtn) {
      prevImageBtn.addEventListener("click", () => {
        if (currentImages.length > 0) {
          currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
          updateGalleryModal()
        }
      })
    }
  
    if (nextImageBtn) {
      nextImageBtn.addEventListener("click", () => {
        if (currentImages.length > 0) {
          currentIndex = (currentIndex + 1) % currentImages.length
          updateGalleryModal()
        }
      })
    }
  
    const closeButton = document.querySelector("#gallery-modal .close")
    if (closeButton && galleryModal) {
      closeButton.addEventListener("click", () => {
        galleryModal.style.display = "none"
      })
    }
  
    if (galleryModal) {
      window.addEventListener("click", (event) => {
        if (event.target == galleryModal) {
          galleryModal.style.display = "none"
        }
      })
    }
  
    // Añadir soporte para dispositivos táctiles en los overlays de menú
    const menuItems = document.querySelectorAll(".menu-item")
  
    menuItems.forEach((item) => {
      const overlay = item.querySelector(".menu-item-overlay")
      const imageContainer = item.querySelector(".menu-item-image-container")
  
      // Detectar si es dispositivo táctil
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
  
      if (isTouchDevice) {
        // En dispositivos táctiles, alternar la visibilidad del overlay al tocar
        imageContainer.addEventListener("click", (e) => {
          // Cerrar todos los otros overlays primero
          document.querySelectorAll(".menu-item-overlay.active").forEach((el) => {
            if (el !== overlay) {
              el.classList.remove("active")
              el.style.opacity = "0"
            }
          })
  
          // Alternar el estado del overlay actual
          if (overlay.classList.contains("active")) {
            overlay.classList.remove("active")
            overlay.style.opacity = "0"
          } else {
            overlay.classList.add("active")
            overlay.style.opacity = "1"
  
            // Evitar que el clic se propague al documento
            e.stopPropagation()
          }
        })
  
        // Cerrar overlays al tocar en cualquier otro lugar
        document.addEventListener("click", () => {
          document.querySelectorAll(".menu-item-overlay.active").forEach((el) => {
            el.classList.remove("active")
            el.style.opacity = "0"
          })
        })
      }
    })
  
    // Scroll reveal animation
    const scrollRevealElements = document.querySelectorAll(".scroll-reveal")
  
    const checkScroll = () => {
      scrollRevealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.classList.add("revealed")
        }
      })
    }
  
    window.addEventListener("scroll", checkScroll)
    window.addEventListener("load", checkScroll)
  
    // Google Maps initialization
    let google // Declare google variable
    function initMap() {
      if (document.getElementById("map")) {
        const cafeLocation = { lat: -34.397, lng: 150.644 } // Replace with your cafe's coordinates
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: cafeLocation,
          styles: [
            {
              featureType: "all",
              elementType: "geometry.fill",
              stylers: [{ weight: "2.00" }],
            },
            {
              featureType: "all",
              elementType: "geometry.stroke",
              stylers: [{ color: "#9c9c9c" }],
            },
            {
              featureType: "all",
              elementType: "labels.text",
              stylers: [{ visibility: "on" }],
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [{ color: "#f2f2f2" }],
            },
            {
              featureType: "landscape",
              elementType: "geometry.fill",
              stylers: [{ color: "#f9f5f0" }],
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road",
              elementType: "all",
              stylers: [{ saturation: -100 }, { lightness: 45 }],
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [{ color: "#d4b996" }],
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [{ visibility: "simplified" }],
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [{ color: "#46bcec" }, { visibility: "on" }],
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ color: "#c8d7d4" }],
            },
          ],
        })
  
        const marker = new google.maps.Marker({
          position: cafeLocation,
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#e6b325",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#2c231e",
          },
        })
      }
    }
  
    // Call initMap when the Google Maps script has loaded
    window.initMap = initMap
  
    // Check if Google Maps API is loaded
    if (typeof google !== "undefined" && google && google.maps) {
      initMap()
    } else {
      // Load the Google Maps API asynchronously
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap` // Replace YOUR_API_KEY
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  })
  