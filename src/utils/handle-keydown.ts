export function makeHandleKeydown(
  elem: HTMLElement
): (event: KeyboardEvent) => void {
  return (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "Tab") {
      const tabbable = [...elem.querySelectorAll("*")].filter(
        (n) => (n as HTMLElement).tabIndex >= 0
      );
      console.log(tabbable.map((e) => e.getAttribute("tab-index")));
      const { activeElement } = document;
      if (!activeElement) {
        return;
      }
      let index = tabbable.indexOf(activeElement);
      if (index === -1 && e.shiftKey) {
        index = 0;
      }
      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;
      (tabbable[index] as HTMLElement).focus();
      e.preventDefault();
    }
  };
}
