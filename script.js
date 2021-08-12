(function main() {
  // When speed increases by 1 km/h
  // Fuel consumption increases by 1.009
  // Return as litres with 1 decimal eg 4.5
  const totalConsumption = (speed = 0, consumption = 0, multiplier) => {
    if (speed === 1) return +(consumption * multiplier).toFixed(1);
    let total = consumption;
    for (let i = 0; i < speed; i++) {
      total *= 1.009;
    }
    return +(total * multiplier).toFixed(1);
  };

  // Return trip duration as hours and minutes
  const getDuration = (distance, speed) => {
    let minutes = Math.round((distance / speed) * 60);
    let hours = 0;
    while (minutes >= 60) {
      hours++;
      minutes -= 60;
    }
    const totalHours = hours
      ? `${hours} h`
      : '';
    const totalMinutes = minutes
      ? `${minutes} min`
      : '';

    return totalHours
      ? `${totalHours} ${totalMinutes}`
      : `${totalMinutes}`;
  };

  // Make object from data
  const getValues = (speed, distance, car, multiplier) => {
    if (speed === 0) return '-';
    const trip = {
      speed,
      totalGas: totalConsumption(speed, car, multiplier),
      duration: getDuration(distance, speed),
    };
    return trip;
  };

  // Set values to text
  const setText = (trip, i) => {
    const gas = document.getElementById(`gas${i}`);
    const duration = document.getElementById(`duration${i}`);
    const speed = document.getElementById(`speedInfo${i}`);
    if (!trip.speed) {
      gas.innerText = '-';
      duration.innerText = '-';
      speed.innerText = '-';
      return;
    }

    gas.innerText = `${trip.totalGas} L`;
    duration.innerText = `${trip.duration}`;
    speed.innerText = `${trip.speed} km/h`;
  };

  // Eventlistener for elements that have class name 'inputs'
  document.body.addEventListener('input', (event) => {
    const { target } = event;
    if (target.classList.contains('inputs')) {
      // Change values to numbers
      const car = document.querySelector('input[name="car"]:checked').value;
      const distance = +document.getElementById('distance').value;
      const speed1 = +document.getElementById('speed1').value;
      const speed2 = +document.getElementById('speed2').value;
      const speedLabel1 = document.getElementById('showSpeed1');
      const speedLabel2 = document.getElementById('showSpeed2');
      const distanceLabel = document.getElementById('showDistance');
      const multiplier = distance / 100;

      // Set slider indicator value
      distanceLabel.innerText = `${distance} km`;
      speedLabel1.innerText = `${speed1} km/h`;
      speedLabel2.innerText = `${speed2} km/h`;

      // Reset fields if no distance
      if (!distance) {
        setText({ speed: null }, 1);
        setText({ speed: null }, 2);
        return;
      }
      if (distance && car) {
        // Calculate values
        const info1 = getValues(speed1, distance, car, multiplier);
        const info2 = getValues(speed2, distance, car, multiplier);

        // Insert text to fields
        setText(info1, 1);
        setText(info2, 2);
      }
    }
  });
}());
