import api from '../api/api.js';
import {
  TESTIMONIALS_ONE,
  TESTIMONIALS_ONE_SELECTED,
  TESTIMONIALS_ALL,
  TESTIMONIAL_UPDATE,
  TESTIMONIAL_DELETE
} from './types/testimonialTypes.js';

export const testimonialsAll = () => ({
  type: TESTIMONIALS_ALL,
  payload: api.get('/testimonials/')
});

export const testimonialsOne = (id) => ({
  type: TESTIMONIALS_ONE,
  payload: api.get(`/testimonials/${id}`)
});

export const testimonialsOneSelected = (payload) => ({
  type: TESTIMONIALS_ONE_SELECTED,
  payload
});

export const testimonialUpdate = (id, testimonialData) => (dispatch) => {
  const response = dispatch({
    type: TESTIMONIAL_UPDATE,
    payload: api.put(`/testimonials/${id}`, testimonialData)
  });

  return response.then(() => dispatch(testimonialsOne(id)));
};

export const testimonialDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: TESTIMONIAL_DELETE,
    payload: api.delete(`/testimonials/${id}`)
  });

  return response.then(() => dispatch(testimonialsAll()));
};
