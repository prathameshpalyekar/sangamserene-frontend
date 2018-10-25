const regionCities = {
    stockholm: [{
        name: 'Stockholm',
        value: 'Stockholm',
        shortForm: 'STHLM',
    }, {
        name: 'Uppsala',
        value: 'Uppsala',
        shortForm: 'U-A',
    }],

    malmo: [{
        name: 'Malmö',
        value: 'Malmö',
        shortForm: 'M-Ö',
    }, {
        name: 'Lund',
        value: 'Lund',
        shortForm: 'L-U',
    }]
}

export default {
    getCityList: function() {
        let cities = [];
        Object.keys(regionCities).map((region) => {
            cities = cities.concat(regionCities[region])
        });
        return cities;
    },
    getRegions: function() {
        return regionCities;
    },
    getActiveRegion: function(cities) {
        let regionValue = '';
        if (cities.length !== 0) {
            const value = cities[0];
            Object.keys(regionCities).some((region) => {
                if (regionCities[region].some((city) => city.value === value)) {
                    regionValue = region;
                    return true;
                }
                return false;
            });
        }
        return regionValue;
    },
    getCityShortNames: function(cities) {
        if (cities.length !== 0) {
            if (cities.length === 1) {
                return cities[0];
            } else {
                const activeRegion = this.getActiveRegion(cities);
                const activeRegionCities = regionCities[activeRegion];
                const cityNames = cities.map((cityValue) => {
                    return activeRegionCities.find((city) => city.value === cityValue).shortForm;
                });
                return cityNames.join(', ');
            }
        }
        return '';
    }
};
