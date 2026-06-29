export const fadeUp = {

  hidden: {

    opacity: 0,

    y: 30

  },

  show: {

    opacity: 1,

    y: 0,

    transition: {

      duration: .6

    }

  }

};

export const stagger = {

  hidden:{},

  show:{

    transition:{

      staggerChildren:.12

    }

  }

};

export const scaleIn={

  hidden:{

    opacity:0,

    scale:.95

  },

  show:{

    opacity:1,

    scale:1,

    transition:{

      duration:.4

    }

  }

};