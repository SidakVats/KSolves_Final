import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "Creator",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: "",
    likes: 0,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a new FormData object
    const data = new FormData();
    
    // Append all form fields to the FormData object
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
  
    axios
      .post("/createEvent", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Event posted successfully:", response.data);
        alert("Event created successfully!"); // Show success alert
  
        // Reset the form fields after alert is closed
        setFormData({
          owner: user ? user.name : "Creator",
          title: "",
          optional: "",
          description: "",
          organizedBy: "",
          eventDate: "",
          eventTime: "",
          location: "",
          ticketPrice: 0,
          image: "",
          likes: 0,
        });
      })
      .catch((error) => {
        console.error("Error posting event:", error);
      });
  };
  
  
  

  return (
    <div className="flex flex-col p-3 lg:p-10 mt-10">
      <div>
        <h1 className="font-bold text-[36px] mb-5">Post an Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <label className="flex flex-col">
            Title:
            <input
              type="text"
              name="title"
              className=" rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            Sub-Title:
            <input
              type="text"
              name="optional"
              className=" rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none"
              value={formData.optional}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            Description:
            <textarea
              name="description"
              className=" rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <label className="flex flex-col">
            Organized By:
            <input
              type="text"
              className=" rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none"
              name="organizedBy"
              value={formData.organizedBy}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            Event Date:
            <input
              type="date"
              className=" rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            Event Time:
            <input
              type="time"
              name="eventTime"
              className=" rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none"
              value={formData.eventTime}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <label className="flex flex-col">
            Location:
            <input
              type="text"
              name="location"
              className=" rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            Ticket Price:
            <input
              type="number"
              name="ticketPrice"
              className=" rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none"
              value={formData.ticketPrice}
              onChange={handleChange}
            />
          </label>
          
          </div>
          <label className="flex flex-col">
            Image:
            <input
              type="file"
              name="image"
              className=" rounded mt-2 pl-5 px-4 py-10 ring-sky-700 ring-2 h-8 border-none"
              onChange={handleImageUpload}
            />
          </label>
          <button className="primary" type="submit">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
