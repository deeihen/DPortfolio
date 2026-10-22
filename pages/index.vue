<template>
  <div>
    <HeroSection />
    <AchievementTicker />
    <EducationSection />
    <EvidenceSection />
    <ProjectsSection />
    <StackSection />
    <AboutSection />
    <SkillsSection />
    <ContactSection />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Mark Dennis Concha's Portfolio",
  description: 'Mark Dennis Concha, cybersecurity enthusiast and CS student at Taguig City University, training to be a SOC analyst.',
  ogTitle: "Mark Dennis Concha's Portfolio",
  ogDescription: 'Education, certifications, projects and the security stack I work with.',
  ogImage: '/mephoto.jpg',
  twitterCard: 'summary_large_image',
})
</script>
