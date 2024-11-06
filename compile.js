const fs = require('fs');
const handlebars = require('handlebars');

// Read the Handlebars template file (index.hbs)
const templateSource = fs.readFileSync('views/index.hbs', 'utf-8');

// Compile the Handlebars template
const template = handlebars.compile(templateSource);

// Provide the context/data for the template
const context = {
    title: 'Hotel Menu',
    // Add more dynamic data here as needed
};

// Generate the HTML from the Handlebars template
const html = template(context);

// Write the compiled HTML to the 'public' folder
fs.writeFileSync('public/index.html', html);

console.log('index.html generated!');
