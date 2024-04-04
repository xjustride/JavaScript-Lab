const asyncAdd = async (a, b) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a + b);
      }, 100);
    });
  };
  
  const asyncSumArray = async (numbers) => {
    if (!Array.isArray(numbers) || !numbers.every(Number.isFinite)) {
      throw new Error('Argumenty muszą mieć typ number!');
    }
  
    const sum = await numbers.reduce(async (accPromise, num) => {
      const acc = await accPromise;
      return asyncAdd(acc, num);
    }, Promise.resolve(0));
    
    return sum;
  };
  
  let numbers = [];
  for (let i = 0; i < 100; i++) {
      numbers.push(Math.random());
  }
  
  const start = performance.now();
  asyncSumArray(numbers)
    .then((sum) => {
      const end = performance.now();
  
      console.log('Wynik dodawania liczb:', sum);
      console.log(`Czas wykonania: ${end - start} ms`);
    })
    .catch((error) => {
      const end = performance.now();
  
      console.log('Błąd:', error);
      console.log(`Czas wykonania (do wystąpienia błędu): ${end - start} ms`);
    });
  
  