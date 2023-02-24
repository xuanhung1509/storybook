import { createContext, useContext } from 'react';

const createSafeContext = <ContextValue,>() => {
  const Context = createContext<ContextValue | null>(null);

  const useSafeContext = () => {
    const ctx = useContext(Context);

    if (ctx === null) {
      throw new Error('Context must be used inside a provider');
    }

    return ctx;
  };

  const Provider = ({
    value,
    children,
  }: {
    value: ContextValue;
    children: React.ReactNode;
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  return [Provider, useSafeContext] as const;
};

export default createSafeContext;
