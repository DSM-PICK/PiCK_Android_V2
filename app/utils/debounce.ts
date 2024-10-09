export const debounce = (action: () => void, delay: number) => {
  let timer: any;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action();
    }, delay);
  };
};
