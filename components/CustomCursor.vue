<template>
  <div>
    <div ref="cursor" class="cursor"></div>
    <div ref="follower" class="cursor-follower"></div>
  </div>
</template>

<script setup>
const cursor = ref(null)
const follower = ref(null)

onMounted(() => {
  let mouseX = 0, mouseY = 0
  let followerX = 0, followerY = 0

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (cursor.value) {
      cursor.value.style.left = mouseX - 6 + 'px'
      cursor.value.style.top = mouseY - 6 + 'px'
    }
  })

  function animate() {
    followerX += (mouseX - followerX) * 0.12
    followerY += (mouseY - followerY) * 0.12
    if (follower.value) {
      follower.value.style.left = followerX - 18 + 'px'
      follower.value.style.top = followerY - 18 + 'px'
    }
    requestAnimationFrame(animate)
  }
  animate()

  // Scale on hover
  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor.value) cursor.value.style.transform = 'scale(2.5)'
      if (follower.value) follower.value.style.transform = 'scale(1.5)'
    })
    el.addEventListener('mouseleave', () => {
      if (cursor.value) cursor.value.style.transform = 'scale(1)'
      if (follower.value) follower.value.style.transform = 'scale(1)'
    })
  })
})
</script>
