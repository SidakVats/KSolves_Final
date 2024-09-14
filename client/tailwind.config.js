/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors:{
            'background': '#fafafa',
            'primary': '#fb5607',
            'secondary': '#ff9f1c',
            'primarydark': '#dc2f02',
            'primarylight':'#ff9f1c',
         }

      },
   },
   plugins: [],
};
