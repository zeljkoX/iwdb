var wines;

var vukoje = [{
    name: 'Zilavka',
    vintage: 2010,
    winery: {
        name: 'Vukoje'
    },
    country: {
        name: 'Bosnia and Herzegovina'
    },
    region: {
        name: 'Herzegovina'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Merlot',
    vintage: 2010,
    winery: {
        name: 'Vukoje'
    },
    country: {
        name: 'Bosnia and Herzegovina'
    },
    region: {
        name: 'Herzegovina'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Vranac',
    vintage: 2010,
    winery: {
        name: 'Vukoje'
    },
    country: {
        name: 'Bosnia and Herzegovina'
    },
    region: {
        name: 'Herzegovina'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Pinot Noir',
    vintage: 2010,
    winery: {
        name: 'Vukoje'
    },
    country: {
        name: 'Bosnia and Herzegovina'
    },
    region: {
        name: 'Herzegovina'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Cabarnet',
    vintage: 2010,
    winery: {
        name: 'Vukoje'
    },
    country: {
        name: 'Bosnia and Herzegovina'
    },
    region: {
        name: 'Herzegovina'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
}];

var rubin = [{
    name: 'Zilavka',
    vintage: 2010,
    winery: {
        name: 'Vukoje'
    },
    country: {
        name: 'Bosnia and Herzegovina'
    },
    region: {
        name: 'Herzegovina'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Merlot',
    vintage: 2010,
    winery: {
        name: 'Vukoje'
    },
    country: {
        name: 'Bosnia and Herzegovina'
    },
    region: {
        name: 'Herzegovina'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Vranac',
    vintage: 2010,
    winery: {
        name: 'Rubin',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Pinot Noir',
    vintage: 2010,
    winery: {
        name: 'Rubin',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Cabarnet',
    vintage: 2010,
    winery: {
        name: 'Rubin',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
}];

var zupa = [{
    name: 'Zilavka',
    vintage: 2010,
    winery: {
        name: 'Zupa',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Merlot',
    vintage: 2010,
    winery: {
        name: 'Zupa',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Vranac',
    vintage: 2010,
    winery: {
        name: 'Zupa',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Pinot Noir',
    vintage: 2010,
    winery: {
        name: 'Zupa',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Cabarnet',
    vintage: 2010,
    winery: {
        name: 'Zupa',
        country: 'Serbia',
        region: 'Krusevac'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
}];

var kutjevo = [{
    name: 'Zilavka',
    vintage: 2010,
    winery: {
        name: 'Kutjevo',
        country: 'Croatia',
        region: 'Slavonija'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Merlot',
    vintage: 2010,
    winery: {
        name: 'Kutjevo',
        country: 'Croatia',
        region: 'Slavonija'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Vranac',
    vintage: 2010,
    winery: {
        name: 'Kutjevo',
        country: 'Croatia',
        region: 'Slavonija'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Pinot Noir',
    vintage: 2010,
    winery: {
        name: 'Kutjevo',
        country: 'Croatia',
        region: 'Slavonija'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
},
{
    name: 'Cabarnet',
    vintage: 2010,
    winery: {
        name: 'Kutjevo',
        country: 'Croatia',
        region: 'Slavonija'
    },
    alc: 12,
    volume: [0.750],
    wineType: 'white',
    published: true
}];

//wines = [].concat(vukoje, rubin, zupa, kutjevo);

wines = vukoje;

module.exports = wines;