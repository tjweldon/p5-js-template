const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const RED = "#FF0000"
const BLUE = "#0000FF"
const GREEN = "#00FF00"

const setup = (s) => () => {
    s.createCanvas(WIDTH, HEIGHT)
    s.background(0)
}

const vector = (x, y) => {
    let vec = {
        x: x,
        y: y,
        list: () => [x, y]
    };

    vec.plus = (other) => vector(vec.x + other.x, vec.y + other.y);
    vec.scale = (s) => vector(s * vec.x, s * vec.y);
    return vec;
}

// List buffer with a max length defined on construction.
// Overflow is lost. Push goes onto head of array
const buffer = (max_len) => {
    let buf = {
        contents: [],
        max_len: max_len,
    };
    buf.push = (item) => {
        buf.contents = [item, ...buf.contents.values()];
        if (buf.contents.length > buf.max_len) {
            buf.contents = buf.contents.slice(0, -1);
        }
    };
    buf.rev = () => [...buf.contents].reverse()
    return buf;
};

const history_gradient = (length, start_colour_hex, end_colour_hex) => {
    const trim = (hex) => hex.length === 6 ? hex : hex.slice(1, 7);
    const mk_rgb = (_r, _g, _b) => {
        let rgb = {r: _r, g: _g, b: _b};
        rgb.to_hex = () => {
            return "#"
                + parseInt(rgb.r, 10).toString(16).padStart(2, '0')
                + parseInt(rgb.g, 10).toString(16).padStart(2, '0')
                + parseInt(rgb.b, 10).toString(16).padStart(2, '0')
        }

        rgb.partway_to = (rgb_2, ratio) => {
            let vec_rgb = [rgb_2.r - rgb.r, rgb_2.g - rgb.g, rgb_2.b - rgb.b].map(
                item => item * ratio
            );
            return mk_rgb(
                rgb.r + vec_rgb[0],
                rgb.g + vec_rgb[1],
                rgb.b + vec_rgb[2]
            );
        }

        return rgb
    };
    const to_rgb = (hex) => {
        hex = trim(hex);
        let slices = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(
            (item) => parseInt(item, 16)
        );

        return mk_rgb(slices[0], slices[1], slices[2])
    };

    start_colour_hex = to_rgb(start_colour_hex);
    end_colour_hex = to_rgb(end_colour_hex);

    let intermediate = (n) => start_colour_hex.partway_to(end_colour_hex, n / length)

    return [...Array(length).keys()].map(x => intermediate(x).to_hex())
}


let i = 0;
let history = buffer(360);
const colour_sequence = [
    ...history_gradient(60, RED, BLUE),
    ...history_gradient(60, BLUE, GREEN),
    ...history_gradient(60, GREEN, RED),
];


const center = vector(WIDTH / 2, HEIGHT / 2)
const center_path = (theta) => center
const circle_path = (radius) => (theta) => vector(
    Math.cos((theta/360)*2*Math.PI),
    Math.sin((theta/360)*2*Math.PI),
).scale(radius)

const path = (i) => vector(
    WIDTH / 4 * Math.cos((i / 360) * 5 * Math.PI),
    HEIGHT / 4 * (Math.sin((i / 360) * 2/3 * Math.PI)) * Math.sin((i / 360) * 24 * Math.PI)
).plus(center);


const draw = (s) => () => {
    let bg_colour = s.color(0, 0, 0);
    bg_colour.setAlpha(8);
    s.fill(bg_colour);
    s.noStroke();
    s.rect(0, 0, WIDTH, HEIGHT);


    s.fill("#FFFFFF");
    s.noStroke();

    let lil_circle = theta => circle_path(HEIGHT/8)(theta)
    let last_pos = center;
    let positions = [];
    for (let j = 0; j < 10; j++) {
        last_pos = last_pos.plus(lil_circle(i*(2*j+2)/3).scale(1/(j+3)));
        positions.push(last_pos);
    }

    let stroke_color = s.color(255, 255, 255);
    stroke_color.setAlpha(64);
    let k = 0;
    for (let position of positions) {
        s.stroke(stroke_color)
        if (k===0) {
            s.line(center.x, center.y, position.x, position.y);
        } else {
            s.line(positions[k-1].x, positions[k-1].y, position.x, position.y);
        }
        s.noStroke()
        s.circle(position.x, position.y, 5);
        k++;
    }
    // let position = center
    //     .plus(circle_path(HEIGHT/8)(i))
    //     .plus(circle_path(HEIGHT/8)(2*i))
    //     .plus(circle_path(HEIGHT/8)(3*i))
    //     .plus(circle_path(HEIGHT/8)(4*i))
    // ;
    // [...history.contents.values()].forEach(
    //     (val, index) => {
    //         s.fill([...colour_sequence][index])
    //         s.circle(val.x, val.y, 20);
    //     }
    // )
    // s.fill([...colour_sequence][i%colour_sequence.length]);
    // s.circle(position.x, position.y, 20);
    i += 1;
}


let sketch = (s) => {
    s.setup = setup(s)
    s.draw = draw(s)
}

const sketchInstance = new p5(sketch);