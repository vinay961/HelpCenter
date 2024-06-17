import { useState } from 'react'
import Nav from '../Nav.jsx'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'
import './Rooms.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Contact() {
  const [agreed, setAgreed] = useState(false)
  const [formData, setFormData] = useState({
    area: '',
    district: '',
    state: '',
    roomImage: null,
    phoneNumber: '',
    message: '',
    price: '',
    gender: '',
    roomType: '',
  })
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, roomImage: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key])
    })

    try {
      console.log(data);
      const response = await fetch('http://localhost:8000/api/rooms/roomregister', {
        method: 'POST',
        body: data,
        credentials: 'include',
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Room registered successfully!' })
        // Clear form inputs
        setFormData({
          area: '',
          district: '',
          state: '',
          roomImage: null,
          phoneNumber: '',
          message: '',
          price: '',
          gender: '',
          roomType: '',
        })
        setAgreed(false)
      } else {
        const errorData = await response.json()
        setMessage({ type: 'error', text: errorData.message || 'Failed to register room' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while registering the room' })
    }
  }

  return (
    <>
      <Nav />
      <div>
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8 roombody">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">Add Room Details</h2>
            <p className="mt-2 text-lg leading-8 text-white">
              List your room with us and reach thousands of potential renters.
            </p>
          </div>
          {message && (
            <div className={`mt-4 p-4 rounded-md text-center ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl sm:mt-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="area" className="block text-sm font-semibold leading-6 text-white">
                  Area
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="area"
                    id="area"
                    placeholder="Sector-10A .."
                    autoComplete="given-name"
                    value={formData.area}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="district" className="block text-sm font-semibold leading-6 text-white">
                  District
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="district"
                    id="district"
                    placeholder="Gurgaon ..."
                    autoComplete="family-name"
                    value={formData.district}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="state" className="block text-sm font-semibold leading-6 text-white">
                  State
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Haryana ..."
                    autoComplete="organization"
                    value={formData.state}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="roomImage" className="block text-sm font-semibold leading-6 text-white">
                  Upload Images
                </label>
                <div className="mt-2.5">
                  <input
                    type="file"
                    name="roomImage"
                    id="roomImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-white">
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>IN</option>
                      <option>US</option>
                      <option>EU</option>
                    </select>
                    <ChevronDownIcon
                      className="pointer-events-none absolute right-3 top-0 h-full w-5 text-black"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-semibold leading-6 text-white">
                  Price
                </label>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="400"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-semibold leading-6 text-white">
                  Room for
                </label>
                <div className="mt-2.5">
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" className='font-bold'>Select</option>
                    <option value="boys" className='font-bold'>Boys</option>
                    <option value="girls" className='font-bold'>Girls</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="roomType" className="block text-sm font-semibold leading-6 text-white">
                  About Room
                </label>
                <div className="mt-2.5">
                  <select
                    name="roomType"
                    id="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white text-gray-900"
                  >
                    <option value="Fully Furnished: Includes bed, table, chair, fan, light; suitable for students." className="py-1 font-bold">
                      Fully Furnished: Includes bed, table, chair, fan, light; suitable for students.
                    </option>
                    <option value="Semi-Furnished: Includes 1BHK with personal bathroom, bed, table, chair, light, fan, small hall/balcony." className="py-1 font-bold">
                      Semi-Furnished: Includes 1BHK with personal bathroom, bed, table, chair, light, fan, small hall/balcony.
                    </option>
                    <option value="Unfurnished: Includes 2BHK with two rooms, personal bathroom, bed, table, chair, light, fan, medium-sized hall/balcony." className="py-1 font-bold">
                      Unfurnished: Includes 2BHK with two rooms, personal bathroom, bed, table, chair, light, fan, medium-sized hall/balcony.
                    </option>
                    <option value="other" className="py-1 font-bold">
                      Other
                    </option>
                  </select>
                  {/* Conditional input field based on selection */}
                  {formData.roomType === 'other' && (
                    <input
                      type="text"
                      id="message"
                      name="message"
                      value={formData.customRoomType}
                      onChange={handleChange}
                      className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white text-gray-900"
                      placeholder="Enter custom room description"
                    />
                  )}
                </div>
              </div>
              <Field as="div" className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? 'bg-green-600' : 'bg-red-600',
                      'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    )}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
                <Label className="text-sm leading-6 text-gray-400">
                  By selecting this, you agree to our{' '}
                  <a href="#" className="font-semibold text-indigo-600">
                    privacy&nbsp;policy
                  </a>
                </Label>
              </Field>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
