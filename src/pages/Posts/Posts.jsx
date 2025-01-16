import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
  getPostsError,
  getPostsPending,
  getPostsSuccess
} from '../../toolkit/PostsSlicer'
import Axios from '../../Axios'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Container } from '../../components/shared/Container/Container'

export const PostsSlider = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.posts)
  const phoneNumber = useSelector(state => state.user.data?.data?.phoneNumber)

  useEffect(() => {
    const getAllPosts = async () => {
      dispatch(getPostsPending())
      try {
        const response = await Axios.get('post/all')
        dispatch(getPostsSuccess(response.data?.data || []))
      } catch (error) {
        dispatch(
          getPostsError(error.response?.data?.message || 'Failed to load posts')
        )
      }
    }
    getAllPosts()
  }, [dispatch])

  const handleLike = async (id, currentLikeStatus) => {
    try {
      const response = await Axios.put(`post/${id}/like`, {
        likeStatus: !currentLikeStatus,
        phoneNumber
      })
      const updatedPost = response.data.data
      dispatch(
        getPostsSuccess(
          data.map(post =>
            post._id === id
              ? {
                  ...post,
                  likes: updatedPost.likes,
                  dislikes: updatedPost.dislikes
                }
              : post
          )
        )
      )
    } catch (error) {
      alert('You can only like or dislike once!')
    }
  }

  const handleDislike = async (id, currentDislikeStatus) => {
    try {
      const response = await Axios.put(`post/${id}/dislike`, {
        dislikeStatus: !currentDislikeStatus,
        phoneNumber
      })
      const updatedPost = response.data.data
      dispatch(
        getPostsSuccess(
          data.map(post =>
            post._id === id
              ? {
                  ...post,
                  likes: updatedPost.likes,
                  dislikes: updatedPost.dislikes
                }
              : post
          )
        )
      )
    } catch (error) {
      alert('You can only like or dislike once!')
      console.error('Error disliking post:', error)
    }
  }

  return (
    <div className='flex w-full h-[500px]'>
      <Container>
        <div className='w-full flex justify-center items-center gap-2 p-4'>
          <div className='flex flex-col gap-2 items-end'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
          <p className='uppercase font-bold text-xl text-[#86b817]'>
            Testimonial{' '}
          </p>
          <div className='flex flex-col gap-2'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
        </div>
        <p className='w-full text-center text-blue-950 font-[900] text-5xl'>
          Our Clients Say!!!
        </p>
        <br />
        <br />
        <br />
        <div className='container mx-auto min-h-[270px] h-auto: my-5'>
          {isPending ? (
            <div className='flex justify-center items-center'>Loading ...</div>
          ) : isError ? (
            <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
          ) : data.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              // autoplay={{ delay: 10000 }}
              spaceBetween={30}
              slidesPerView={1}
              className='w-full h-full'
            >
              {data.map(post => (
                <SwiperSlide key={post._id} className='flex justify-center'>
                  <div className='flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-[80%] md:w-[60%] lg:w-[40%]'>
                    <img
                      src={post.avatar}
                      alt='Avatar'
                      className='w-16 h-16 rounded-full object-cover mb-4'
                    />
                    <p className='font-semibold text-lg mb-1'>
                      {post.firstName}
                    </p>
                    <p className='text-sm text-gray-500 mb-3'>{post.address}</p>
                    <p className='text-gray-700 text-sm text-center mb-4'>
                      {post.smsContent.length > 150
                        ? post.smsContent.slice(0, 150) + ' ...'
                        : post.smsContent}
                    </p>

                    <div className='flex items-center space-x-4'>
                      <button
                        className={`flex items-center space-x-1 ${
                          post.likes.length > 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                        } hover:text-red-600`}
                        onClick={() =>
                          handleLike(post._id, post.likes.includes(phoneNumber))
                        }
                      >
                        <ThumbsUp />
                        <span>{post.likes.length}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-1 ${
                          post.dislikes.length > 0
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        } hover:text-blue-600`}
                        onClick={() =>
                          handleDislike(
                            post._id,
                            post.dislikes.includes(phoneNumber)
                          )
                        }
                      >
                        <ThumbsDown />
                        <span>{post.dislikes.length}</span>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className='text-gray-600 text-center text-lg mt-4'>
              No Posts found.
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}
