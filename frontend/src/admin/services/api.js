const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

export const getToken = () => localStorage.getItem('admin_token');
export const setToken = (token) => localStorage.setItem('admin_token', token);

export const getAdminUser = () => {
  try {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setAdminUser = (user) => {
  localStorage.setItem('admin_user', JSON.stringify(user));
};

export const removeToken = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  let method = (options.method || 'GET').toUpperCase();
  let body = options.body;
  const headers = {
    Accept: 'application/json',
    ...options.headers,
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  // When sending FormData with PUT or PATCH, PHP does not populate $_POST or $_FILES natively.
  // We use Laravel's standard method spoofing by sending POST with _method = PUT/PATCH.
  if (body instanceof FormData && (method === 'PUT' || method === 'PATCH')) {
    if (!body.has('_method')) {
      body.append('_method', method);
    }
    method = 'POST';
  }

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    method,
    headers,
    body,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      window.location.href = '/admin/login';
      return;
    }
    if (response.status === 403) {
      removeToken();
      const errorMsg = encodeURIComponent(data.message || 'You are not an admin');
      window.location.href = `/admin/login?error=${errorMsg}`;
      return;
    }
    throw new Error(data.message || 'API request failed');
  }

  return data;
};
