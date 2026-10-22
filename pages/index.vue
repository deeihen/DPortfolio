<template>
  <div>
    <HeroSection />
    <TriageSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Mark Dennis Concha, aspiring SOC analyst',
  description: 'Mark Dennis Concha, cybersecurity enthusiast and CS student at Taguig City University, training to be a SOC analyst.',
  ogTitle: 'Mark Dennis Concha, aspiring SOC analyst',
  ogDescription: 'Find the intrusion in a real-looking auth log, then see what I practise.',
  ogImage: '/mephoto.jpg',
  twitterCard: 'summary_large_image',
})
</script>
