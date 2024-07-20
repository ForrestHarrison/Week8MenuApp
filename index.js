class BandMember {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }

    describe() {
        return `${this.name} plays ${this.instrument}`;
    }
}

class Band {
    constructor(name) {
        this.name = name;
        this.members = [];
    }

    addMember(member) {
        if (member instanceof BandMember) {
            this.members.push(member);
        } else {
            throw new Error(`You can only add an instance of BandMember. Argument is not a member: ${member}`);
        }
    }

    describe() {
        return `${this.name} has ${this.members.length} members.`;
    }
}

class Menu {
    constructor() {
        this.bands = [];
        this.selectedBand = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create a new band
        2) view a band
        3) delete a band
        4) display all bands     
        `);
    }

    showBandMenuOptions(bandInfo) {
        return prompt(`
            0) back
            1) create a new member
            2) delete a member
            --------------------
            ${bandInfo}
        `);
    }

    displayBands() {
        let bandString = '';
        for (let i = 0; i < this.bands.length; i++) {
            bandString += i + ') ' + this.bands[i].name + '\n';
        }
        alert(bandString);
    }

    createBand() {
        let name = prompt('Enter name for new band:');
        this.bands.push(new Band(name));
    }

    viewBand() {
        let index = prompt('Enter the index of the band you wish to view:');
        index = parseInt(index);
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = 'Band Name: ' + this.selectedBand.name + '\n';
            
            for (let i = 0; i < this.selectedBand.members.length; i++) {
                description += i + ') ' + this.selectedBand.members[i].name 
                    + ' - ' + this.selectedBand.members[i].instrument + '\n';
            }

            let selection1 = this.showBandMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createMember();
                    break;
                case '2':
                    this.deleteMember();
                    break;
            }
        }
    }

    deleteBand() {
        let index = prompt('Enter the index of the band that you wish to delete:');
        index = parseInt(index);
        if (index > -1 && index < this.bands.length) {
            this.bands.splice(index, 1);
        }
    }

    createMember() {
        let name = prompt('Enter name for new member:');
        let instrument = prompt('Enter instrument for new member:');
        this.selectedBand.addMember(new BandMember(name, instrument));
    }

    deleteMember() {
        let index = prompt('Enter the index of the member that you wish to delete:');
        index = parseInt(index);
        if (index > -1 && index < this.selectedBand.members.length) {
            this.selectedBand.members.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
