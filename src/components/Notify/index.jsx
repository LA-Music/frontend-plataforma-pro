import React from 'react'

export const notify = (place, message, color) => {
  var type;
  switch (color) {
    case 1: type = "primary"; break;
    case 2: type = "success"; break;
    case 3: type = "danger";  break;
    case 4: type = "warning"; break;
    case 5: type = "info";    break;
    default: break;
  }
  
  var options = {};
  options = {
    place: place,
    message: (
      <div>
        <div>
          {message}
        </div>
      </div>
    ),
    type: type,
    icon: "nc-icon nc-bell-55",
    autoDismiss: 7
  };
  return options
}