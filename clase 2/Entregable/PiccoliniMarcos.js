class Usuario {

    constructor(nombre, apellido) {        
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}.`;
    }

    addMascota(nombre) {
        this.mascotas.push(nombre);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) { 
        const book = [
            {
                'name' : nombre, 
                'author' : autor
            }
        ];
                
        this.libros.push(book);
    }

    getBookNames() {
        const soloNombres = [];        
        this.libros.forEach(element => {
            element.forEach(book => {                                               
                soloNombres.push(book.name)                
            });
        });        
        return soloNombres;
    }
}

const UsuarioUno = new Usuario('Marcos', 'Piccolini');
console.log('Nombre Completo: ' + UsuarioUno.getFullName());

UsuarioUno.addMascota('Zuki');
UsuarioUno.addMascota('Salem');
console.log('Cantidad de mascotas: ' + UsuarioUno.countMascotas());

UsuarioUno.addBook('El Señor de los Anillos','J.R.R. Tolkien');
UsuarioUno.addBook('Harry Potter','J.K. Rowling');
UsuarioUno.addBook('El Código da Vinci','Dan Brown');
console.log(UsuarioUno.getBookNames());