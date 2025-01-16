import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Axios'
import {
  getGalleryError,
  getGalleryPending,
  getGallerySuccess
} from '../../toolkit/GallerySlicer'
import { useNavigate } from 'react-router-dom'
import { ThumbsDown, ThumbsUp, Trash } from 'lucide-react'
import { Container } from '../../components/shared/Container/Container'

export const Gallery = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const { data, isError } = useSelector(state => state.gallery)
  const userData = useSelector(state => state.user.data)
  const navigate = useNavigate()
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [imagePending, setImagePending] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const phoneNumber = userData.data?.phoneNumber
  const [a, setA] = useState(false)
  const [photoData, setphotoData] = useState({
    Designation: '',
    photos: [],
    phoneNumber: phoneNumber || 999999999,
    isAdminn: false
  })

  useEffect(() => {
    if (userData?.data?.phoneNumber) {
      setphotoData(prevData => ({
        ...prevData,
        phoneNumber: userData.data.phoneNumber
      }))
    }
  }, [userData])

  const handleInputChange = e => {
    const { name, value } = e.target
    setphotoData(prevData => ({ ...prevData, [name]: value }))
  }
  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        formImageData.append('photos', files[i])
      }
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setphotoData(prevData => ({
        ...prevData,
        photos: [...data.photos]
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setImagePending(false)
    }
  }
  useEffect(() => {
    const getAllGallery = async () => {
      dispatch(getGalleryPending())
      try {
        const response = await Axios.get('gallery')
        dispatch(getGallerySuccess(response.data?.data || []))
        setShowForm(false)
      } catch (error) {
        dispatch(
          getGalleryError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllGallery()
  }, [dispatch, a])

  const handleLike = async (id, currentLikeStatus) => {
    if (!isAuth) return navigate('/singup')
    try {
      const response = await Axios.put(`gallery/${id}/like`, {
        likeStatus: !currentLikeStatus,
        phoneNumber
      })
      const updatedGallery = response.data.data
      dispatch(
        getGallerySuccess(
          data.map(photo =>
            photo._id === id
              ? {
                  ...photo,
                  likes: updatedGallery.likes,
                  dislikes: updatedGallery.dislikes
                }
              : photo
          )
        )
      )
      if (selectedPhoto && selectedPhoto._id === id) {
        setSelectedPhoto({
          ...selectedPhoto,
          likes: updatedGallery.likes,
          dislikes: updatedGallery.dislikes
        })
      }
    } catch (error) {
      alert('You can only like or dislike once!')
    }
  }

  const handleAddPhoto = async e => {
    e.preventDefault()
    try {
      setIsPending(true)
      const formData = {
        ...photoData,
        phoneNumber: userData.data?.phoneNumber || photoData.phoneNumber
      }
      await Axios.post('gallery/create', formData)

      setShowForm(false)
      setA(!a)
      navigate('/gallery')
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  const handleDislike = async (id, currentDislikeStatus) => {
    if (!isAuth) return navigate('/singup')
    try {
      const response = await Axios.put(`gallery/${id}/dislike`, {
        dislikeStatus: !currentDislikeStatus,
        phoneNumber
      })
      const updatedGallery = response.data.data
      dispatch(
        getGallerySuccess(
          data.map(photo =>
            photo._id === id
              ? {
                  ...photo,
                  likes: updatedGallery.likes,
                  dislikes: updatedGallery.dislikes
                }
              : photo
          )
        )
      )
      if (selectedPhoto && selectedPhoto._id === id) {
        setSelectedPhoto({
          ...selectedPhoto,
          likes: updatedGallery.likes,
          dislikes: updatedGallery.dislikes
        })
      }
    } catch (error) {
      alert('You can only like or dislike once!')
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return
    try {
      await Axios.delete(`gallery/${id}`)
      dispatch(getGallerySuccess(data.filter(photo => photo._id !== id)))
      alert('Photo deleted successfully')
      setSelectedPhoto(null)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete photo')
    }
  }

  return (
    <div className='pt-[120px] h-auto'>
      <Container className={'w-full'}>
        {isAuth ? (
          <div className='w-full flex flex-col gap-5 justify-between items-center py-4'>
            <div className='w-full flex justify-center items-center gap-2 p-4'>
              <div className='flex flex-col gap-2 items-end'>
                <div className='w-10 h-[2px] bg-[#86b817]'></div>
                <div className='w-20 h-[2px] bg-[#86b817]'></div>
              </div>
              <p className='uppercase font-bold text-xl text-[#86b817]'>
                Gallery
              </p>
              <div className='flex flex-col gap-2'>
                <div className='w-10 h-[2px] bg-[#86b817]'></div>
                <div className='w-20 h-[2px] bg-[#86b817]'></div>
              </div>
            </div>
            <p className='w-full text-center text-blue-950 font-[900] text-5xl'>
              Gallery
            </p>
            <button
              onClick={() => setShowForm(true)}
              className='bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors'
            >
              Add Photo
            </button>
          </div>
        ) : null}
        <br />
        {showForm && (
          <div className='fixed z-[999] inset-0 bg-black bg-opacity-75 flex justify-center items-center'>
            <div
              className='bg-white rounded-lg shadow-lg p-6 max-w-xl w-full'
              onClick={e => e.stopPropagation()}
            >
              <h2 className='text-2xl font-semibold mb-4'>Add a Photo</h2>
              <form onSubmit={handleAddPhoto} className='space-y-4'>
                <div>
                  <label className='block text-gray-700'>Select Photo</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div>
                  <label className='block text-gray-700'>Designation</label>
                  <input
                    type='text'
                    name='Designation'
                    onChange={handleInputChange}
                    placeholder='Enter designation'
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='flex space-x-4'>
                  <button
                    disabled={imagePending || isPending}
                    className={`${
                      imagePending || isPending
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-green-700'
                    } w-full text-xl py-2 rounded-md text-white`}
                  >
                    {imagePending || isPending ? 'Loading...' : 'Submit'}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowForm(false)}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {isPending ? (
            <div className='w-full fixed top-0 h-screen flex items-center justify-center'>
              <div className='loader'></div>
            </div>
          ) : data.length > 0 ? (
            data.map(photo => (
              <div
                key={photo._id}
                className='relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer'
                onClick={() => setSelectedPhoto(photo)}
              >
                {photo.client === userData.data?._id ? (
                  <div className='flex w-[100px] rounded-md h-[20px] fixed top-2 items-center justify-center -left-1 bg bg-[#86b817] text-white font-bold  z-[999]'>
                    YOUR
                  </div>
                ) : null}
                <img
                  src={photo.photos[0] || null}
                  alt='Gallery'
                  className='w-full h-60 object-cover transition duration-500 ease-in-out transform hover:scale-110'
                />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 text-white w-full p-2'>
                  <h3 className='text-lg font-semibold'>
                    {photo.Designation.length > 50
                      ? photo.Designation.slice(0, 50) + ' ...'
                      : photo.Designation}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <h1>No data!</h1>
          )}
        </div>

        {selectedPhoto && (
          <div
            className='fixed z-[999] inset-0 bg-black bg-opacity-75 flex justify-center items-center'
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className='bg-white rounded-lg shadow-lg p-6 max-w-xl w-full'
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.photos[0]}
                alt='Selected'
                className='w-full h-72 object-cover rounded-lg'
              />
              <div className='mt-4'>
                <div className='flex items-center justify-start gap-2'>
                  <img
                    src={selectedPhoto.avatar}
                    className='w-[20px] h-[20px]'
                    alt='user'
                  />
                  <p className='text-gray-600'>{selectedPhoto.firstName}</p>
                </div>
                <div className='flex items-center space-x-4 mt-4'>
                  {isAuth ? (
                    <>
                      <button
                        onClick={() =>
                          handleLike(
                            selectedPhoto._id,
                            selectedPhoto.likes.includes(phoneNumber)
                          )
                        }
                        className='bg-green-500 flex gap-1 text-white px-4 py-2 rounded hover:bg-green-600'
                      >
                        <ThumbsUp /> {selectedPhoto.likes.length}
                      </button>
                      <button
                        onClick={() =>
                          handleDislike(
                            selectedPhoto._id,
                            selectedPhoto.dislikes.includes(phoneNumber)
                          )
                        }
                        className='bg-red-500 flex gap-1 text-white px-4 py-2 rounded hover:bg-red-600'
                      >
                        <ThumbsDown /> {selectedPhoto.dislikes.length}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate('/singup')}
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                    >
                      register
                    </button>
                  )}
                  {isAuth && selectedPhoto.client === userData.data._id && (
                    <button
                      onClick={() => handleDelete(selectedPhoto._id)}
                      className='bg-red-500 flex gap-1 text-white px-4 py-2 rounded hover:bg-red-600'
                    >
                      <Trash />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
