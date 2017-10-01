document.querySelector('.ui-value').addEventListener('mouseover', (e) => {
  document.querySelector('.ui-options').style.opacity = "1";
})

document.querySelectorAll('label').forEach((label) => {
  label.addEventListener('click', () => {
    document.querySelector('.ui-value').textContent = label.textContent;
    document.querySelector('.ui-options').style.opacity = "0";
  });
});