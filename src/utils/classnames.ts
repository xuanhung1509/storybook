const cx = (...classes: Array<string | boolean | undefined | null>) =>
  classes.filter(Boolean).join(' ');

export default cx;
