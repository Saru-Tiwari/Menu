const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Body parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Menu data structure (similar to your original Python code)
const menu = {
  "MOMO": {
    "Chicken": 300,
    "Veg": 150
  },
  "Pizza": {
    "Large": 800,
    "Medium": 450,
    "Small": 300
  },
  "Beer": {
    "Gorkha strong": 700,
    "Nepal Ice": 700
  }
};

// Route to render the main menu page
app.get('/', (req, res) => {
  res.render('index', { menu });
});

// Route to process the order
app.post('/order', (req, res) => {
  const selectedItems = req.body.item || [];
  let totalAmount = 0;
  const orderedItems = [];

  // Process each selected item
  selectedItems.forEach(itemFull => {
    const [itemName, subItemName] = itemFull.split('-');
    if (menu[itemName] && menu[itemName][subItemName]) {
      totalAmount += menu[itemName][subItemName];
      orderedItems.push(`${subItemName} ${itemName}`);
    }
  });

  // Render the order page
  res.render('order', { totalAmount, orderedItems });
});

// Start the server on port 3000
app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});
