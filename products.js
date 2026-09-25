// ---- MoonMade products ----
// This is the one place to add, remove or edit bags. The shop grid, cart and checkout all read from here.
//
// id:      short unique name, no spaces (used internally by the cart)
// name:    shown on the site
// price:   in dollars, e.g. 245. Use 0 while the price isn't decided yet (shows as "Price TBC")
// colours: the colour options a customer can pick
// image:   a photo in the images/ folder, e.g. 'images/crescent-black.jpg'. Use null for the moon placeholder.
// alt:     a short description of the photo, for screen readers

const PRODUCTS = [
  {
    id: 'crescent',
    name: 'The Crescent Bag',
    price: 0,
    colours: ['Black', 'Cream'],
    image: null,
    alt: 'The Crescent Bag',
  },
  {
    id: 'eclipse',
    name: 'The Eclipse Pouch',
    price: 0,
    colours: ['Dark Brown'],
    image: null,
    alt: 'The Eclipse Pouch',
  },
  {
    id: 'tide',
    name: 'The Tide Bag',
    price: 0,
    colours: ['Butter', 'Black'],
    image: null,
    alt: 'The Tide Bag',
  },
];

// Where orders are emailed (via FormSubmit.co, free, no account).
// The very first order sends an activation email to this address. Click the link in it once.
const ORDER_EMAIL = '';
