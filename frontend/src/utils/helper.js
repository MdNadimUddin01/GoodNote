export const getInitals = (name) => {
    if(!name){
        return "";
    }

    const words = name.split(" ");

    let initals = ""

    for(let i = 0 ; i < Math.min(words.length , 2) ; i++){
        initals += words[i][0]
    }

    // console.log(initals);

    return initals.toUpperCase();
}

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email);
}