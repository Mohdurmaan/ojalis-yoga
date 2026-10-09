import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ShivComponent from "./components/ShivComponent";

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Meditation from "./pages/Meditation";
import Benefits from "./pages/Benefits";
import Trainers from "./pages/Trainers";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Books from "./pages/Books";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import BookSession from "./pages/BookSession";
import OnlineClasses from "./pages/OnlineClasses";
import Studio from "./pages/Studio";
import WhatWeTeachDetail from "./pages/WhatWeTeachDetail";

import "./index.css";
import "./ojalis.css";

import AdminLayout from "./admin/layouts/AdminLayout";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import JournalList from "./admin/pages/journal/JournalList";
import JournalForm from "./admin/pages/journal/JournalForm";
import StudioList from "./admin/pages/studio/StudioList";
import StudioForm from "./admin/pages/studio/StudioForm";
import EventList from "./admin/pages/events/EventList";
import EventForm from "./admin/pages/events/EventForm";
import TeacherList from "./admin/pages/teachers/TeacherList";
import TeacherForm from "./admin/pages/teachers/TeacherForm";
import BookSessionList from "./admin/pages/book-sessions/BookSessionList";
import EventBookingList from "./admin/pages/events/EventBookingList";
import EventDetails from "./pages/EventDetails";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <Navbar />}

      {/* Sirf Home page par hi ShivComponent dikhega (FINAL/LOCKED APPROVED ELEMENT) */}
      {!isAdmin && isHome && <ShivComponent />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/books" element={<Books />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-session" element={<BookSession />} />

        {/* New Navigation Routes */}
        <Route path="/what-we-teach/meditation" element={<Meditation />} />
        <Route path="/what-we-teach/:slug" element={<WhatWeTeachDetail />} />
        <Route path="/online-classes" element={<OnlineClasses />} />
        <Route path="/online-classes/:slug" element={<EventDetails />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/journal" element={<Blog />} />
        <Route path="/journal/:id" element={<BlogPost />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="journal" element={<JournalList />} />
          <Route path="journal/create" element={<JournalForm />} />
          <Route path="journal/edit/:id" element={<JournalForm />} />
          <Route path="studio" element={<StudioList />} />
          <Route path="studio/create" element={<StudioForm />} />
          <Route path="studio/edit/:id" element={<StudioForm />} />
          <Route path="online-classes" element={<EventList />} />
          <Route path="online-classes/create" element={<EventForm />} />
          <Route path="online-classes/edit/:id" element={<EventForm />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="teachers/create" element={<TeacherForm />} />
          <Route path="teachers/edit/:id" element={<TeacherForm />} />
          <Route path="event-bookings" element={<EventBookingList />} />
          <Route path="book-sessions" element={<BookSessionList />} />
        </Route>
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;