<Route
  path="/admin"
  element={
    <RequireAuth allowed={['admin']}>
      <AdminPanel />
    </RequireAuth>
  }
/>