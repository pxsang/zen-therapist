const theme = {
  color: {
    primary: '#5C2D8B',
    title: '#303030',
    white: '#FFFFFF',
    text: '#505050',
    gray: '#BDBDBD',
    border: '#E3E9F2',
    error: '#DF2F45',
    link: '#47D1C3',
  },
  spacing: {
    s: 10,
    m: 20,
    l: 40,
    xl: 80,
  },
  textVariants: {
    title: {
      fontSize: 24,
    },
  },
  header: {
    height: 200,
  },
  block: {
    rowMiddle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowMiddleCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    rowCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    blockMiddleBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    middleCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    marginBottom: num => ({
      marginBottom: num,
    }),
    marginTop: num => ({
      marginTop: num,
    }),
    marginLeft: num => ({
      marginLeft: num,
    }),
    marginRight: num => ({
      marginRight: num,
    }),
    paddingHorizontal: num => ({
      paddingHorizontal: num,
    }),
    paddingVertical: num => ({
      paddingVertical: num,
    }),
  },
};

export default theme;
