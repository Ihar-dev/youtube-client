const getBody = (): HTMLElement | null => document.querySelector('body');
const getElementByClassName = (className: string): HTMLElement | null => document.querySelector(`.${className}`);
const getListOfElementsByClassName = async (className: string): Promise < NodeListOf < HTMLElement > | null > => document.querySelectorAll(`.${className}`);
const getElementById = (idName: string): HTMLElement | null => document.getElementById(idName);
const setElementActive = async (element: HTMLElement): Promise < void > => element.classList.add('active');
const addClassForElement = async (element: HTMLElement, className: string): Promise < void > => element.classList.add(className);/* eslint-disable-line */
const setElementInactive = async (element: HTMLElement): Promise < void > => element.classList.remove('active');
const removeClassForElement = async (element: HTMLElement, className: string): Promise < void > => element.classList.remove(className);/* eslint-disable-line */
const toggleElement = async (element: HTMLElement): Promise < boolean > => element.classList.toggle('active');
const classListContains = (element: HTMLElement, className: string): boolean => element.classList.contains(className);/* eslint-disable-line */
const getRandomElementForStringArray = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];/* eslint-disable-line */
const setAttributeForElements = (elements: HTMLElement[], attribute: string, value: string) => elements.forEach(el => el.setAttribute(attribute, value));/* eslint-disable-line */
const setAttributeForElement = (element: HTMLElement, attribute: string, value: string) => element.setAttribute(attribute, value);/* eslint-disable-line */
const getAttributeFromElement = (element: HTMLElement, attribute: string) => element.getAttribute(attribute);/* eslint-disable-line */
const applyStyle = (element: HTMLElement, style: string, value: string) => element.setAttribute(style, value);/* eslint-disable-line */

export {
  getBody,
  getElementByClassName,
  getListOfElementsByClassName,
  getElementById,
  setElementActive,
  addClassForElement,
  setElementInactive,
  removeClassForElement,
  toggleElement,
  classListContains,
  getRandomElementForStringArray,
  setAttributeForElements,
  setAttributeForElement,
  getAttributeFromElement,
  applyStyle,
};
