# PopupJS


## Description
PopupJS is a tool usefull to create popups windows easily.\
It is possible to manipulate it's property to make :
- An information message
- A welcome window
- An annotation message on some element
- etc...


## Methods of the PopupJS class
The PopupJS class act as a popup manager.
| Fonctions | Description | Parameters |
| :--- | :--- | :--- |
| popupjs.`create()` | Create a popup object and return it | options |
| popupjs.`getById()` | Return a popup object corresponding to the id passed in parameter | id |
| popupjs.`getAll()` | Return all existing popup objects in an Array | - |
| popupjs.`destroy()` | Delete the popup of the page and it's datas | id |
| popupjs.`clearAll()` | Delete all popups and datas | - |
| popupjs.`count()` | Return the number of created popups | - |


## Fonctions of popups objects
| Fonctions | Description |
| :--- | :--- |
| mypopup.`add()` | Add the popup to the page if not present |
| mypopup.`delete()` | Delete the popup of the page and it's datas |
| mypopup.`open()` | Open the popup |
| mypopup.`close()` | Close the popup |
| mypopup.`validate()` | Execute the `buttonvalidate_callback` function and close the popup |
| mypopup.`cancel()` | Execute the `buttoncancel_callback` function and close the popup |
| mypopup.`refresh()` | Update the visual part based on the current properties |


## Options of popups objects
| Properties | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `id` | Popup identifier | {String} | "box-xxxxxxxxxxxx" |
| `width` | Popup width (px) | {Number} | 400 |
| `height` | Popup height (px) | {Number} | 150 |
| `radius` | Border radius of the popup window | {Number} | 10 |
| `shadow_show` | Show a shadow behind the popup window | {Boolean} | true |
| `color_main` | Main color of the popup (header & footer background) | {String} | "#888" |
| `color_secondary` | Secondary color of the popup (header & footer text) | {String} | "#FFF" |
| `draggable` | Allow to move the popup (grab it's header) | {Boolean} | false |
| `modal_show` | Display a drak background | {Boolean} | false |
| `modal_close` | Click on the dark background close the popup | {Boolean} | false |
| `position` | Position of the popup relative to the page (center \| fullscreen \| anchor \| top \| bottom \| left \| right \| topleft \| topright \| bottomleft \| bottomright) | {String} | "center" |
| `anchor_target` | Anchor element for the popup placement when `position="anchor"` | {String} (js selector) | null |
| `anchor_side` | Popup placement side relative to the anchor element (auto \| center \| top \| bottom \| left \| right \| topleft \| topright \| bottomleft \| bottomright) | {String} | "auto" |
| `title_show` | Show the popup header | {String} | true |
| `title_text` | Title text | {String} | "Title" |
| `content_text` | Content text | {String} | "Lorem ipsum..." |
| `buttonclose_show` | Display close button in the header | {Boolean} | true |
| `buttonvalidate_show` | Display Validate button in the footer (ferme le popup) | {Boolean} | false |
| `buttonvalidate_text` | Validate button text | {String} | "Ok" |
| `buttonvalidate_callback` | Validate button callback function | {String} | null |
| `buttoncancel_show` | Display Cancel button in the footer (ferme le popup) | {Boolean} | false |
| `buttoncancel_text` | Cancel button text | {String} | "Cancel" |
| `buttoncancel_callback` | Cancel button callback function | {String} | null |

## Examples

### Popups creation (basics)
1. Instanciate the popup manager, the PopupJS class :
```javascript
var popupjs = new PopupJS();
```
2. To create a popup object call the create() method of the PopupJS class :
```javascript
var mypopup = popupjs.create();
```
3. Open the popup :
```javascript
mypopup.open();
```

### Popup creation with options
```javascript
var popupjs = new PopupJS();

var options = {
    width: 350,
    height: 200,
    radius: 10,
    shadow_show: true,
    color_main: '#0AF',
    color_secondary: '#FFF',
    draggable: true,
    modal_show: false,
    modal_close: false,
    position: 'center',
    title_show: true,
    title_text: 'Box 1',
    buttonclose_show: true,
    buttonvalidate_show: true,
    buttonvalidate_text: 'Yes',
    buttonvalidate_callback: function(){ console.log('Yes'); },
    buttoncancel_show: true,
    buttoncancel_text: 'No',
    buttoncancel_callback: function(){ console.log('No'); },
}
var mypopup = popupjs.create(options);

mypopup.open();
```

### Modification and update
The popup properties can be modified after it's creation.\
To apply the update call the `refresh()` function of the popup object.
```javascript
mypopup.width = 300;
mypopup.height = 300;
mypopup.color_main = '#080';
mypopup.position = 'top';
mypopup.position = 'MyBox';
mypopup.buttoncancel_show = false;
mypopup.draggable = true;

mypopup.refresh();
```

### Annotation on an element
To create an annotation popup on an element :
* Do not display the header and footer (no button).
* Attatch your popup on an element
* Refresh the popup on each movement of the anchor element
```javascript
var popupjs = new PopupJS();

var options = {
    title_show: false,
    buttonclose_show: false,
    buttoncancel_show: false,
    position: 'anchor',
    anchor_target: '#anchor_element',
    anchor_side: 'auto',
}
mypopup = popupjs.create(options);
mypopup.open();

window.addEventListener('resize', function(){
    mypopup.refresh();
});
```
