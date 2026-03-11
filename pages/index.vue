<template>
  <div>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'My Portfolio',
  description: 'Personal portfolio of Mark Dennis Concha.',
  ogTitle: 'Mark Dennis Concha — Creative Developer',
  ogDescription: 'Building bold, memorable digital experiences.',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>
