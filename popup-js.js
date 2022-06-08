class PopupJS {

    popups; // Container of all created popups instances

    constructor() {
        this.popups = new Map();
    }

    /** Return the popup corresponding to the id gived in parameter
     * @param {String} id popup identifier
    */
    getById(id){
        return this.popups.get(id);
    }

    /** Return all existin popups in array */
    getAll(){
        return Array.from(this.popups.values());
    }

    /** Delete a popup and it's data corresponding to the id
     * @param {String} id Identifier of the popup to delete
    */
    destroy(id) {
        if( this.popups.has(id) ) {
            let popup = this.getById(id);
            popup.delete(); // delete in DOM
            this.popups.delete(id); // delete Map datas
        } else {
            console.warn('No popup found for id:',id);
        }
    }

    /** Delete all popups and datas */
    clearAll() {
        for ( const key of this.popups.keys() ) {
            let popup = this.getById(key);
            popup.delete(); // delete in DOM
        }
        this.popups = new Map(); // Reset all Map datas
    }

    /** Get the number of registered popups */
    count() {
        return this.popups.size;
    }

    /** Create a new popup and register it
     * @param {Object} options popup options
     * @return {Object} new created popup
    */
    create(options) {

        let popup = {
            // Customisable
            id: undefined, // {String} Popup identifier
            width: undefined, // {Number} Popup width
            height: undefined, // {Number} Popup height
            radius: undefined, // {Number} Popup border radius
            shadow_show: undefined, // {Boolean} Popup shadow
            color_main: undefined, // {String} Popup main color
            color_secondary: undefined, // {String} Popup secondary color
            draggable: undefined, // {Boolean} Permit to move the popup
            modal_show: undefined, // {Boolean} Display or not the modal of the popup
            modal_close: undefined, // {Boolean} The modal can close the popup
            position: undefined, // {String} Popup postion center | fullscreen | top | bottom | left | right | topleft | topright | bottomleft | bottomright
            anchor_target: undefined, // {String} Anchor selector for the posittion:'anchor'
            anchor_side: undefined, // {String} Popup placement side for position:'anchor' top | bottom | left | right | topleft | topright | bottomleft | bottomright | center
            header_show: undefined, // {Boolean} Display popup header
            title_text: undefined, // {String} Popup title text
            content_text: undefined, // {String} Popup content text
            buttonclose_show: undefined, // {Boolean} Display close button [x]
            buttonvalidate_show: undefined, // {Boolean} Display validate button
            buttonvalidate_text: undefined, // {String} Validate button text
            buttonvalidate_callback: undefined, // {Function} Function triggered function by the Validate button
            buttoncancel_show: undefined, // {Boolean} Display Cancel button
            buttoncancel_text: undefined, // {String} Cancel button text
            buttoncancel_callback: undefined, // {Function} Function triggered function by the Cancel button
            // Not customisable
            html: undefined, // Popup HTML
            style: undefined, // Popup style
            open: undefined, // Function to display the popup
            refresh: undefined, // Function to refresh the popup visual
            validate: undefined, // Function to trigger the Validate button
            cancel: undefined, // Function to trigger the Cancel button
            delete: undefined, // Function to delete the popup
        };

        // Popup identifier
        if ( options!==undefined && options.id!==undefined ) {
            popup.id = options.id;
        } else { popup.id = 'popup-' + Math.random().toString(16).slice(2); }

        // Anchor selector for the posittion:'anchor' (default: null)
        if( options!==undefined && options.anchor_target!==undefined ) {
            popup.anchor_target = options.anchor_target;
        } else { popup.anchor_target = null; }

        // Popup placement side for position:'anchor' (default: null)
        if( options!==undefined && options.anchor_side!==undefined ) {
            popup.anchor_side = options.anchor_side;
        } else { popup.anchor_side = null; }

        // Popup main color (default: #888)
        if( options!==undefined && options.color_main!==undefined ) {
            popup.color_main = options.color_main;
        } else { popup.color_main = '#888'; }

        // Popup secondary color (default: #FFF)
        if( options!==undefined && options.color_secondary!==undefined ) {
            popup.color_secondary = options.color_secondary;
        } else { popup.color_secondary = '#FFF'; }

        // Popup width (default: 400)
        if( options!==undefined && options.width!==undefined ) {
            popup.width = options.width;
        } else { popup.width = 400; }

        // Popup height (default: 150)
        if( options!==undefined && options.height!==undefined ) {
            popup.height = options.height;
        } else { popup.height = 150; }

        // Popup border radius (default: 10px)
        if( options!==undefined && options.radius!==undefined ) {
            popup.radius = options.radius;
        } else { popup.radius = 10; }

        // The modal can close the popup (default: false)
        if( options!==undefined && options.modal_close!==undefined ) {
            popup.modal_close = options.modal_close;
        } else { popup.modal_close = false; }

        // Display close button [x] (default: true)
        if( options!==undefined && options.buttonclose_show!==undefined ) {
            popup.buttonclose_show = options.buttonclose_show;
        } else { popup.buttonclose_show = true; }

        // Permit to move the popup (default: false)
        if( options!==undefined && options.draggable!==undefined ) {
            popup.draggable = options.draggable;
        } else { popup.draggable = false; }

        // Display or not the modal of the popup (default: false)
        if( options!==undefined && options.modal_show!==undefined ) {
            popup.modal_show = options.modal_show;
        } else { popup.modal_show = false; }

        // Display popup header (default: true)
        if ( options!==undefined && options.header_show!==undefined ) {
            popup.header_show = options.header_show;
        } else { popup.header_show = true; }

        // Popup title text (default: Title...)
        if ( options!==undefined && options.title_text!==undefined ) {
            popup.title_text = options.title_text;
        } else { popup.title_text = 'Title'; }

        // Popup content text (default: Lorem ipsum...)
        if ( options!==undefined && options.content_text!==undefined ) {
            popup.content_text = options.content_text;
        } else { popup.content_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'; }

        // Display validate button (default: false)
        if ( options!==undefined && options.buttonvalidate_show!==undefined ) {
            popup.buttonvalidate_show = options.buttonvalidate_show;
        } else { popup.buttonvalidate_show = false; }

        // Validate button text (default: Valider)
        if ( options!==undefined && options.buttonvalidate_text!==undefined ) {
            popup.buttonvalidate_text = options.buttonvalidate_text;
        } else { popup.buttonvalidate_text = 'Ok'; }

        // Popup shadow (default: true)
        if ( options!==undefined && options.shadow_show!==undefined ) {
            popup.shadow_show = options.shadow_show;
        } else { popup.shadow_show = true; }

        // Function triggered by the Validate button (default: null)
        if ( options!==undefined && options.buttonvalidate_callback!==undefined ) {
            if ( typeof options.buttonvalidate_callback === 'function') {
                popup.buttonvalidate_callback = options.buttonvalidate_callback;
            } else {
                console.warn('Option buttonvalidate_callback invalid');
                popup.buttonvalidate_callback = null;
            }
        } else {
            popup.buttonvalidate_callback = null;
        }

        // Display Cancel button (default: false)
        if ( options!==undefined && options.buttoncancel_show!==undefined ) {
            popup.buttoncancel_show = options.buttoncancel_show;
        } else { popup.buttoncancel_show = false; }

        // Cancel button text (default: Annuler)
        if ( options!==undefined && options.buttoncancel_text!==undefined ) {
            popup.buttoncancel_text = options.buttoncancel_text;
        } else { popup.buttoncancel_text = 'Cancel'; }

        // Function triggered by the Cancel button (default: null )
        if ( options!==undefined && options.cancel_callback!==undefined ) {
            if ( typeof options.cancel_callback === 'function') {
                popup.cancel_callback = options.cancel_callback;
            } else {
                console.warn('Option cancel_callback invalid');
                popup.cancel_callback = null;
            }
        } else {
            popup.cancel_callback = null;
        }

        // Popup postion (default: center)
        if ( options!==undefined && options.position!==undefined ) {
            popup.position = options.position;
        } else { popup.position = 'center'; }

        Object.defineProperty(popup, 'html', {
            enumerable: false,
            writable: true
        });


        /** Create or update the popup HTML */
        popup.refresh = function () {
            // Blocs creation
            this.style = document.querySelector('head>style.'+this.id);
            if ( this.style === null ){ this.style=document.createElement('style'); }
            this.stylemobile = document.querySelector('head>style.'+this.id+`.mobile`);
            if ( this.stylemobile === null ){ this.stylemobile=document.createElement('style'); }
            this.html = document.querySelector('#'+this.id);
            if ( this.html === null ){ this.html=document.createElement('div'); }
            let modal = document.querySelector('#'+this.id+'>.popup-modal');
            if ( modal === null ){ modal=document.createElement('div'); }
            if ( this.modal_close && this.buttonclose_show ){
                modal.addEventListener('click', this.close); // Click on modal to close
            } else {
                modal.removeEventListener('click', this.close); // Click on modal do nothing
            }
            let popup = document.querySelector('#'+this.id+'>.popup');
            if ( popup === null ){ popup=document.createElement('div'); }
            let header = document.querySelector('#'+this.id+'>.popup>.popup-header');
            if ( header === null ){ header=document.createElement('div'); }
            let title = document.querySelector('#'+this.id+'>.popup>.popup-header>.popup-title');
            if ( title === null ){ title=document.createElement('div'); }
            let close_button = document.querySelector('#'+this.id+'>.popup>.popup-header>.popup-close');
            if ( close_button === null ){
                close_button=document.createElement('div');
                if ( this.header_show && this.buttonclose_show ){ close_button.addEventListener( 'click', this.close ); }
            }
            let content = document.querySelector('#'+this.id+'>.popup>.popup-content');
            if ( content === null ){ content=document.createElement('div'); }
            let footer = document.querySelector('#'+this.id+'>.popup>.popup-footer');
            if ( footer === null ){ footer=document.createElement('div'); }
            let validate_button = document.querySelector('#'+this.id+'>.popup>.popup-footer>.popup-validate');
            if ( validate_button === null ){
                validate_button=document.createElement('button');
                if ( this.buttonvalidate_show ){ validate_button.addEventListener( 'click', this.validate ); }
            }
            let cancel_button = document.querySelector('#'+this.id+'>.popup>.popup-footer>.popup-cancel');
            if ( cancel_button === null ){
                cancel_button=document.createElement('button');
                if ( this.buttoncancel_show ){ cancel_button.addEventListener( 'click', this.cancel ); }
            }

            // Blocs agencement
            this.html.appendChild(modal); // Add modal
            this.html.appendChild(popup); // Add popup
            popup.appendChild(header);
            if ( this.header_show ){
                header.appendChild(title);
            } else {
                if ( header.hasChildNodes(title) ) { title.remove(); }
            }
            if ( this.buttonclose_show ){
                header.appendChild(close_button);
            } else {
                if ( header.hasChildNodes(close_button) ) { close_button.remove(); }
            }
            popup.appendChild(content);
            popup.appendChild(footer);
            if ( this.buttoncancel_show ){
                footer.appendChild(cancel_button);
            } else {
                if ( popup.hasChildNodes(cancel_button) ){ cancel_button.remove(); }
            }
            if ( this.buttonvalidate_show ){
                footer.appendChild(validate_button);
            } else {
                if ( popup.hasChildNodes(validate_button) ){ validate_button.remove(); }
            }

            // Set les attributs
            if ( !this.style.hasAttribute('type') ){ this.style.setAttribute('type','text/css'); }
            if ( !this.style.classList.contains(this.id) ){ this.style.setAttribute('class',this.id); }
            if ( !this.html.hasAttribute('id') ){ this.html.setAttribute('id',this.id); }
            if ( !this.html.classList.contains('popup-html '+this.id) ){ this.html.setAttribute('class','popup-html '+this.id); }
            if ( !this.html.hasAttribute('style') ){ this.html.setAttribute('style','display:none;'); }
            if ( !modal.classList.contains('popup-modal') ){ modal.setAttribute('class','popup-modal'); }
            if( this.modal_show ){
                if ( modal.classList.contains('modal-hidden') ){ modal.classList.remove('modal-hidden'); }
            } else {
                if ( !modal.classList.contains('modal-hidden') ){ modal.classList.add('modal-hidden'); }
            }
            if ( !popup.classList.contains('popup') ){ popup.setAttribute('class','popup'); }
            if ( this.position==='center' ){
                if ( !popup.classList.contains('popup-center') ){
                    popup.classList.add('popup-center'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-center') ){
                popup.classList.remove('popup-center'); // Remove the old position class
            }
            if ( this.position==='fullscreen' ){
                if ( !popup.classList.contains('popup-fullscreen') ){
                    popup.classList.add('popup-fullscreen'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-fullscreen') ){
                popup.classList.remove('popup-fullscreen'); // Remove the old position class
            }

            if ( this.position==='anchor' ){
                if ( !popup.classList.contains('popup-anchor') ){
                    popup.classList.add('popup-anchor'); // Add class for this position
                }

                // Search for specified anchor in the page
                let target = document.querySelector(this.anchor_target);
                if ( target===null ){ console.error('nullanchor_target not found'); return null; }
                let target_coord = target.getBoundingClientRect();

                // Automatic placement with the anchor position on screen
                let target_position = null;
                let anchor_side_auto = null;
                if (this.anchor_side==='auto' || this.anchor_side===null) {
                    let target_center_coord = {
                        x: target_coord.left + target_coord.width/2,
                        y: target_coord.top+target_coord.height/2
                    }
                    // Find the anchor vertical position on the screen
                    if ( target_center_coord.y >= 0 && target_center_coord.y <= window.innerHeight/3) {
                        target_position = 'top';
                    } else if (target_center_coord.y > window.innerHeight/3 && target_center_coord.y < window.innerHeight/3*2 ) {
                        target_position = 'center';
                    } else if (target_center_coord.y >= window.innerHeight/3*2 && target_center_coord.y <= window.innerHeight ) {
                        target_position = 'bottom';
                    }
                    // Find the anchor horizontal position on the screen
                    if ( target_center_coord.x >= 0 && target_center_coord.x <= window.innerWidth/3) {
                        target_position += 'left';
                    } else if (target_center_coord.x > window.innerWidth/3 && target_center_coord.x < window.innerWidth/3*2 ) {
                        target_position += 'center';
                    } else if (target_center_coord.x >= window.innerWidth/3*2 && target_center_coord.x <= window.innerWidth ) {
                        target_position += 'right';
                    }
                    // Find window placement on the screen
                    if ( target_position=='topleft' ){ anchor_side_auto='bottomright'; }
                    else if ( target_position=='topcenter' ){ anchor_side_auto='bottom'; }
                    else if ( target_position=='topright' ){ anchor_side_auto='bottomleft'; }
                    else if ( target_position=='centerleft' ){ anchor_side_auto='right'; }
                    else if ( target_position=='centercenter' ){ anchor_side_auto='top'; }
                    else if ( target_position=='centerright' ){ anchor_side_auto='left'; }
                    else if ( target_position=='bottomleft' ){ anchor_side_auto='topright'; }
                    else if ( target_position=='bottomcenter' ){ anchor_side_auto='top'; }
                    else if ( target_position=='bottomright' ){ anchor_side_auto='topleft'; }
                    else { anchor_side_auto='top'; }
                }


                // Anchor placement
                if (this.anchor_side==='top' || anchor_side_auto===null) {
                    popup.style.top = (target_coord.top - this.height) + 'px';
                    popup.style.left = ( (target_coord.left + (target_coord.width/2)) - (this.width/2) ) + 'px';
                } else if (this.anchor_side==='bottom' || anchor_side_auto==='bottom') {
                    popup.style.top = target_coord.top + target_coord.height + 'px';
                    popup.style.left = ((target_coord.left + (target_coord.width/2)) - (this.width/2)) + 'px';
                } else if (this.anchor_side==='left' || anchor_side_auto==='left') {
                    popup.style.top = (target_coord.top+(target_coord.height/2) - (this.height/2)) + 'px';
                    popup.style.left = (target_coord.left - this.width) + 'px';
                } else if (this.anchor_side==='right' || anchor_side_auto==='right') {
                    popup.style.top = (target_coord.top+(target_coord.height/2) - (this.height/2)) + 'px';
                    popup.style.left = (target_coord.left + target_coord.width) + 'px';
                } else if (this.anchor_side==='topleft' || anchor_side_auto==='topleft') {
                    popup.style.top = (target_coord.top - this.height) + 'px';
                    popup.style.left = (target_coord.left - this.width) + 'px';
                } else if (this.anchor_side==='topright' || anchor_side_auto==='topright') {
                    popup.style.top = (target_coord.top - this.height) + 'px';
                    popup.style.left = (target_coord.left + target_coord.width) + 'px';
                } else if (this.anchor_side==='bottomleft' || anchor_side_auto==='bottomleft') {
                    popup.style.top = (target_coord.top + target_coord.height) + 'px';
                    popup.style.left = (target_coord.left - this.width) + 'px';
                } else if (this.anchor_side==='bottomright' || anchor_side_auto==='bottomright') {
                    popup.style.top = (target_coord.top + target_coord.height) + 'px';
                    popup.style.left = (target_coord.left + target_coord.width) + 'px';
                } else if (this.anchor_side==='center') {
                    popup.style.top = (target_coord.top+(target_coord.height/2) - (this.height/2)) + 'px';
                    popup.style.left = (target_coord.left+(target_coord.width/2) - (this.width/2)) + 'px';
                }

            } else if ( popup.classList.contains('popup-anchor') ){ // anchor_side != "auto" && popup.classList.contains('popup-anchor')
                popup.classList.remove('popup-anchor'); // Remove the old position class
                popup.style.top = null; // Reset default position
                popup.style.left = null; // Reset default position
            }

            if ( this.position==='top' ){
                if ( !popup.classList.contains('popup-top') ){
                    popup.classList.add('popup-top'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-top') ){
                popup.classList.remove('popup-top'); // Remove the old position class
            }
            if ( this.position==='bottom' ){
                if ( !popup.classList.contains('popup-bottom') ){
                    popup.classList.add('popup-bottom'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-bottom') ){
                popup.classList.remove('popup-bottom'); // Remove the old position class
            }
            if ( this.position==='left' ){
                if ( !popup.classList.contains('popup-left') ){
                    popup.classList.add('popup-left'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-left') ){
                popup.classList.remove('popup-left'); // Remove the old position class
            }
            if ( this.position==='right' ){
                if ( !popup.classList.contains('popup-right') ){
                    popup.classList.add('popup-right'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-right') ){
                popup.classList.remove('popup-right'); // Remove the old position class
            }
            if ( this.position==='topleft' ){
                if ( !popup.classList.contains('popup-topleft') ){
                    popup.classList.add('popup-topleft'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-topleft') ){
                popup.classList.remove('popup-topleft'); // Remove the old position class
            }
            if ( this.position==='topright' ){
                if ( !popup.classList.contains('popup-topright') ){
                    popup.classList.add('popup-topright'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-topright') ){
                popup.classList.remove('popup-topright'); // Remove the old position class
            }
            if ( this.position==='bottomleft' ){
                if ( !popup.classList.contains('popup-bottomleft') ){
                    popup.classList.add('popup-bottomleft'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-bottomleft') ){
                popup.classList.remove('popup-bottomleft'); // Remove the old position class
            }
            if ( this.position==='bottomright' ){
                if ( !popup.classList.contains('popup-bottomright') ){
                    popup.classList.add('popup-bottomright'); // Add class for this position
                }
            } else if ( popup.classList.contains('popup-bottomright') ){
                popup.classList.remove('popup-bottomright'); // Remove the old position class
            }
            // Set class
            if ( !header.classList.contains('popup-header') ){ header.setAttribute('class','popup-header'); }
            if ( !title.classList.contains('popup-title') ){ title.setAttribute('class','popup-title'); }
            if ( !content.classList.contains('popup-content') ){ content.setAttribute('class','popup-content'); }
            if ( !footer.classList.contains('popup-footer') ){ footer.setAttribute('class','popup-footer'); }
            if ( !close_button.classList.contains('popup-close') ){ close_button.setAttribute('class','popup-close'); }
            if ( !validate_button.classList.contains('popup-button') ){ validate_button.classList.add('popup-button'); }
            if ( !validate_button.classList.contains('popup-validate') ){ validate_button.classList.add('popup-validate'); }
            if ( !cancel_button.classList.contains('popup-button') ){ cancel_button.classList.add('popup-button'); }
            if ( !cancel_button.classList.contains('popup-cancel') ){ cancel_button.classList.add('popup-cancel'); }
            // Set content
            if ( title.innerText != this.title_text ){ title.innerText = this.title_text; }
            if ( content.innerText != this.content_text ){ content.innerText = this.content_text; }
            if ( close_button.innerText != 'x' ){ close_button.innerText = 'x'; }
            let shadow = (this.shadow_show) ? '0 0 15px 5px rgb(0 0 0 / 30%)' : 'none';
            let radius = (Number.isInteger(this.radius)) ? this.radius+'px' : this.radius;
            let newstyle_text = `
            #`+this.id+`.popup-html{
                position:fixed;
                z-index:1050;
                left:0;
                top:0;
            }
            #`+this.id+`.popup-html.popup-hidden{display:none;}
            #`+this.id+`>.popup-modal{
                position:fixed;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:rgb(0 0 0 / 50%);
            }
            #`+this.id+`>.popup-modal.modal-hidden{display:none;}
            #`+this.id+`>.popup{
                z-index:2;
                width:`+this.width+`px;
                border-radius:`+radius+`;
                background:#FFF;
                box-shadow:`+shadow+`;
                height:`+this.height+`px;
                display:flex;
                flex-direction:column;
                flex-wrap:nowrap;
                align-content:center;
                justify-content:space-between;
                align-items:center;
            }
            #`+this.id+`>.popup.popup-center{
                position:fixed;
                bottom:calc(50% - `+this.height+`px/2);
                left:calc(50% - `+this.width+`px/2);
            }
            #`+this.id+`>.popup.popup-top{
                position:fixed;
                top:10px;
                left:calc(50% - `+this.width+`px/2);
            }
            #`+this.id+`>.popup.popup-bottom{
                position:fixed;
                bottom:10px;
                left:calc(50% - `+this.width+`px/2);
            }
            #`+this.id+`>.popup.popup-left{
                position:fixed;
                top:calc(50% - `+this.height+`px/2);
                left:10px;
            }
            #`+this.id+`>.popup.popup-right{
                position:fixed;
                top:calc(50% - `+this.height+`px/2);
                right:10px;
            }
            #`+this.id+`>.popup.popup-topleft{
                position:fixed;
                top:10px;
                left:10px;
            }
            #`+this.id+`>.popup.popup-topright{
                position:fixed;
                top:10px;
                right:10px;
            }
            #`+this.id+`>.popup.popup-bottomleft{
                position:fixed;
                bottom:10px;
                left:10px;
            }
            #`+this.id+`>.popup.popup-bottomright{
                position:fixed;
                bottom:10px;
                right:10px;
            }
            #`+this.id+`>.popup.popup-fullscreen{
                position:fixed;
                top:10px;
                left:10px;
                width:calc(100vw - 10px * 2);
                height:calc(100vh - 10px * 2);
            }
            #`+this.id+`>.popup.popup-anchor{
                position:fixed;
                top:0;
                left:0;
            }
            #`+this.id+`>.popup>.popup-header{
                display:flex;
                flex-direction:row;
                flex-wrap:nowrap;
                align-content:center;
                justify-content:flex-end;
                align-items:flex-start;
                color:`+this.color_secondary+`;
                width:100%;
                border-top-left-radius:inherit;
                border-top-right-radius:inherit;
                background:`+this.color_main+`;
            }
            #`+this.id+`>.popup>.popup-header>.popup-title{
                width:100%;
                color:`+this.color_secondary+`;
                padding-left:15px;
                padding-top:5px;
                padding-bottom:5px;
                font-size:20px;
                font-weight:bold;
                border-top-left-radius:inherit;
            }
            #`+this.id+`>.popup>.popup-header>.popup-close{
                font-size:22px;
                font-weight:600;
                width:40px;
                padding-bottom:4px;
                height:inherit;
                border-top-right-radius:inherit;
                text-align:center;
                cursor:pointer;
            }
            #`+this.id+`>.popup>.popup-content{
                padding:10px;
                max-height:calc(`+this.height+`px);
                overflow-y:auto;
                border-radius:inherit;
                color:#000;
            }
            #`+this.id+`>.popup>.popup-footer{
                display:flex;
                flex-direction:row;
                justify-content:space-evenly;
                flex-wrap:wrap;
                align-items:center;
                align-content:center;
                width:100%;
                border-bottom-left-radius:inherit;
                border-bottom-right-radius:inherit;
                background:`+this.color_main+`;
            }
            #`+this.id+`>.popup>.popup-footer>.popup-button{
                min-width:50px;
                background:transparent;
                color:`+this.color_secondary+`;
                padding:2px 10px;
                margin-top:5px;
                margin-bottom:5px;
                border-style:solid;
                border-width:2px;
                border-color:`+this.color_secondary+`;
                border-radius:5px;
                font-size:14px;
                font-weight:bold;
            }
            #`+this.id+`>.popup>.popup-footer>.popup-button.popup-cancel.popup-hidden{display:none;}
            .popup-dragger{cursor:grab;cursor:-webkit-grab;}
            .popup-dragged{cursor:grabbing;cursor:-webkit-grabbing;}
            @media all and (min-width:0px) and (max-width:`+this.width+`px){
                #`+this.id+`>.popup.popup-center{width:100vw;left:0;}
                #`+this.id+`>.popup.popup-top{width:100vw;left:0;}
                #`+this.id+`>.popup.popup-bottom{width:100vw;left:0;}
                #`+this.id+`>.popup.popup-left{width:100vw;left:0;}
                #`+this.id+`>.popup.popup-right{width:100vw;right:0;}
                #`+this.id+`>.popup.popup-topleft{width:100vw;left:0;}
                #`+this.id+`>.popup.popup-topright{width:100vw;right:0;}
                #`+this.id+`>.popup.popup-bottomleft{width:100vw;left:0;}
                #`+this.id+`>.popup.popup-bottomright{width:100vw;right:0;}
                #`+this.id+`>.popup.popup-fullscreen{width:100vw;left:0;}
            }
            @media all and (min-height:0px) and (max-height:`+this.height+`px){
                #`+this.id+`>.popup.popup-center{height:100vh;top:0;}
                #`+this.id+`>.popup.popup-top{height:100vh;top:0;}
                #`+this.id+`>.popup.popup-left{height:100vh;top:0;}
                #`+this.id+`>.popup.popup-right{height:100vh;top:0;}
                #`+this.id+`>.popup.popup-topleft{height:100vh;top:0;}
                #`+this.id+`>.popup.popup-topright{height:100vh;top:0;}
                #`+this.id+`>.popup.popup-fullscreen{height:100vh;top:0;}
                #`+this.id+`>.popup.popup-bottomleft{height:100vh;bottom:0;}
                #`+this.id+`>.popup.popup-bottomright{height:100vh;bottom:0;}
                #`+this.id+`>.popup.popup-bottom{height:100vh;bottom:0;}
            }
            `;
            if ( this.style.innerHTML != newstyle_text ){ this.style.innerHTML = newstyle_text };
            if ( validate_button.innerText != this.buttonvalidate_text ){ validate_button.innerText = this.buttonvalidate_text; }
            if ( cancel_button.innerText != this.buttoncancel_text ){ cancel_button.innerText = this.buttoncancel_text; }
            // Make the popup draggable or not
            if ( this.draggable ) { // draggable
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                let dragMouseDown = function(e) { // Start drag and drop
                    updateStyle(true, header);
                    e = e || window.event;
                    e.preventDefault();
                    pos3 = e.clientX; // X position of the mouse
                    pos4 = e.clientY; // Y position of the mouse
                    document.onmouseup = closeDragElement; // Call  closeDragElement() when releasing the mouse button
                    document.onmousemove = elementDrag; // Call  elementDrag() when moving mouse
                }
                let elementDrag = function(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // Calcul cursor position
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    popup.style.top = (popup.offsetTop - pos2) + 'px'; // Define new position of the element par rapport starting to the top of the page
                    popup.style.left = (popup.offsetLeft - pos1) + 'px'; // Define new position of the element par rapport starting to the left of the page
                }
                /** Stop moving when releasing the mouse button */
                let closeDragElement = function() {
                    updateStyle(false, header); // Update style when moving
                    document.onmouseup = null; // Clear event
                    document.onmousemove = null; // Clear event
                }
                /** Update window style when moving */
                let updateStyle = function(isDragging, header) {
                    if (isDragging) { // Moving
                        if ( header.classList.contains('popup-dragger') ){ header.classList.remove('popup-dragger'); }
                        if ( !header.classList.contains('popup-dragged') ){ header.classList.add('popup-dragged'); }
                    } else { // Not moving
                        if ( header.classList.contains('popup-dragged') ){ header.classList.remove('popup-dragged'); }
                        if ( !header.classList.contains('popup-dragger') ){ header.classList.add('popup-dragger'); }
                    }
                }
                header.onmousedown = dragMouseDown; // Add event
            } else { // Not draggable
                header.onmousedown = null; // Remove event
                if (this.position!='anchor') { // Exeption to not remove this aattribute used fot the anchor
                    popup.style.top = null; // Reset default position
                    popup.style.left = null; // Reset default position
                }
            } // End draggable

        }

        /** Add popup to the DOM */
        popup.add = function () {
            let popup = document.getElementById(this.id);
            if ( popup === null ) { // Not present...
                this.delete(); // Remove previous
                this.refresh(); // Regenerate the code
                document.head.appendChild(this.style); // Add style to the page
                document.body.appendChild(this.html); // Add HTML to the page
                popup = document.getElementById(this.id);
                if ( popup === null ) {
                    console.error('impossible à ajouter: ',this.id);
                    return;
                }
            }
        }

        /** Ouvre/affiche la popup */
        popup.open = function () {
            let popup = document.getElementById(this.id);
            if ( popup === null ) { // Not present...
                this.delete(); // Remove previous
                this.refresh(); // Regenerate the code
                document.head.appendChild(this.style); // Add style to the page
                document.body.appendChild(this.html); // Add HTML to the page
                popup = document.getElementById(this.id);
                if ( popup === null ) {
                    console.error('popup impossible à ouvrir: ',this.id);
                    return;
                }
            }
            popup.style.display = 'initial';
        }

        /** Hide popup */
        popup.close = function (e) {
            let id = (e !== undefined) ? e.target.closest('[id^="popup-"].popup-html').getAttribute('id') : this.id;
            let popup = document.getElementById(id);
            if ( popup !== null ) {
                popup.style.display = 'none';
            } else {
                console.error('popup not found: ',id);
            }
        }

        /** Validate popup (Validate button), Start the validation callback function if exist */
        popup.validate = function(e) {
            let result = null;
            let id = (e !== undefined) ? e.target.closest('[id^="popup-"].popup-html').getAttribute('id') : this.id;
            if ( typeof popup.buttonvalidate_callback === 'function' ) {
                let exec = popup.buttonvalidate_callback;
                result = exec(e);
            }
            let existing_popup_elements = document.querySelectorAll('.'+id);
            if ( existing_popup_elements.length > 0 ) {
                for (let i=0; i<existing_popup_elements.length; i++) {
                    existing_popup_elements[i].remove();
                }
            }
            return result;
        }

        /** Cancel popup (Cancel button), Start the cancel callback function if exist */
        popup.cancel = function(e) {
            let result = null;
            let id = (e !== undefined) ? e.target.closest('[id^="popup-"].popup-html').getAttribute('id') : this.id;
            if ( typeof popup.buttoncancel_callback === 'function' ) {
                let exec = popup.buttoncancel_callback;
                result = exec(e);
            }
            let existing_popup_elements = document.querySelectorAll('.'+id);
            if ( existing_popup_elements.length > 0 ) {
                for (let i=0; i<existing_popup_elements.length; i++) {
                    existing_popup_elements[i].remove();
                }
            }
            return result;
        }

        /** Remove element from DOM */
        popup.delete = function () {
            let existing_popup_elements = document.querySelectorAll('.'+this.id);
            if ( existing_popup_elements.length > 0 ) {
                for (let i=0; i<existing_popup_elements.length; i++) {
                    existing_popup_elements[i].remove();
                }
            }
        }

        this.popups.set( popup.id , popup ); // Add popup properties to storage
        popup.add(); // Add popup to the DOM
        return popup; // Return popup just created
    } // End create


} // End class PopupJS
