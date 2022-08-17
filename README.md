## Traveling Salesperson Problem Using Simulated Annealing

Simulated annealing (SA) is a probabilistic technique for approximating the global optimum of a given function. Here, I've tried solving the Traveling Salesperson Problem using Simulated Annealing Algorithm.

### To try this, you can either:
* Clone the repository
* Download zip

### Perform the following:

1. Install the dependencies:
```yarn
yarn install
```

2. Run dev mode:
```yarn
yarn dev
```

### You can change the total number of cities inside the code:
```typescript
const sa = new SA({
  cityCount: 25 // Any arbitrary value
});
```

### Result - 20 Random Cities:
![animation](https://user-images.githubusercontent.com/51167857/185204385-7ef48b86-0366-4623-af2f-935ecccc1a66.gif)
