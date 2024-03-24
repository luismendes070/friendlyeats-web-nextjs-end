"use client";

// This components shows one individual restaurant
// It receives data from src/app/restaurant/[id]/page.jsx

import { React, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/lib/firebase/firebase.js";
import {getUser} from '@/src/lib/getUser'
import { updateRestaurantImage } from "@/src/lib/firebase/storage.js";
import ReviewDialog from "@/src/components/ReviewDialog.jsx";
import RestaurantDetails from "@/src/components/RestaurantDetails.jsx";
import ReviewsList from "@/src/components/ReviewsList.jsx";

export default function Restaurant({
  id,
  initialRestaurant,
  initialReviews,
  initialUserId,
}) {
  const [restaurant, setRestaurant] = useState(initialRestaurant);
  const [isOpen, setIsOpen] = useState(false);

  // The only reason this component needs to know the user ID is to associate a review with the user, and to know whether to show the review dialog
  const userId = getUser()?.uid || initialUserId;
  const [review, setReview] = useState({
    rating: 0,
    text: "",
  });
  const [reviews, setReviews] = useState(initialReviews);

  const onChange = (value, name) => {
    setReview({ ...review, [name]: value });
  };

  async function handleRestaurantImage(target) {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }

    const imageURL = await updateRestaurantImage(id, image);
    setRestaurant({ ...restaurant, photo: imageURL });
  }

  const handleClose = () => {
    setIsOpen(false);
    setReview({ rating: 0, text: "" });
  };




    return () => {
      unsubscribeFromRestaurant();
      unsubscribeFromReviewsSnapshot();
    };
  }, []);

  return (
    <div>
      <RestaurantDetails
        restaurant={restaurant}
        userId={userId}
        handleRestaurantImage={handleRestaurantImage}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <ReviewDialog
        isOpen={isOpen}
        handleClose={handleClose}
        review={review}
        onChange={onChange}
        userId={userId}
        id={id}
      />
      <ReviewsList reviews={reviews} userId={userId} />
    </div>
  );
}
