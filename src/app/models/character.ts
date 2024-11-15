export class Character {
    id: number;
    name: string;
    image: string;
    section: string;  
    subject: string;  

    constructor(
        id: number,
        name: string,
        image: string,
        section: string,
        subject: string  
    ) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.section = section;
        this.subject = subject;
    }
}

