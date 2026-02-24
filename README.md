01. difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll.

  getElementById : directly target specific elements ID 
  getElementsByClassName: target all elements of specific class name
  querySelector: select html and css selector to find first matching element
  querySelectorAll: select html and css selector to all matching element


02. How do you create and insert a new element into the DOM?

  ex: parent.appendChild(div)

  first of all, make element to using [ document.createElement('div').]
  then div create on the innerHTML``
  and last use appendChild() to  attached the new element to existing parent in the DOM


03. What is Event Bubbling? And how does it work?

  event bubbling is a process where you click a button on child element,the event does not stop here ,it has automatically going to the main div then work full section .


4. What is Event Delegation in JavaScript? Why is it useful?

  event delegation is a process where multiple child element not attach to different event listener , its attached in a single listener with common parent element.


5. What is the difference between preventDefault() and stopPropagation() methods?

  preventDefault(): its stop the default behavior of element.
  ex: it prevents a from submitting/refreshing or a link from navigating to a new URL

  stopPropagation(): its stop the event from bubbling up the Dom tree. thats mean, child elements event not to spread its parent elements




