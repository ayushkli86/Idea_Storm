supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})