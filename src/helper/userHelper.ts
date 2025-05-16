  export const extractNameFromEmail = async (email: string) => {
    const match = email.match(
      /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/
    );
    if (match && match[1]) {
      const name = match[1].replace(/[^a-zA-Z ]/g, ''); // Remove non-alphabetic characters
      return name.trim();
    }
    const name = email.split('@')[0].replace(/[^a-zA-Z ]/g, '');
    return name.trim();
  };
  