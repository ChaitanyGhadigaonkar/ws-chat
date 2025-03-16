export default function scrollIntoView(element : HTMLElement){
    element.scrollIntoView({ 
        behavior: "smooth",
        block : "center"
    })
}