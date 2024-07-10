var TenD = Class.extend(Combo, {
    key_map: {
        blue:   {       
            'q': 'Z', 'w': 'H', 'e': 'G', 'r': 'D',
            'u': 'A', 'i': 'E', 'o': 'U', 'p': 'N'
        },
        red:    {
            'v': 'Y', 'n': 'W',
        },
        green:  {},
        yellow: {}
    },

    key_order: 'q w e r v n u i o p'.split(' '),

    key_value: { 
        'q': 'Z', 'w': 'H', 'e': 'G', 'r': 'D',
        'v': 'Y', 'n': 'W',
        'u': 'A', 'i': 'E', 'o': 'U', 'p': 'N'
    },

    pm2py: function (pm) {
        var py = (pm
            // ⟨er⟩自成音節
            .replace(/^ZGYWEN$/, "er")
            // 声母
            .replace(/^ZHGD/, "b")
            .replace(/^ZGD/, "p")
            .replace(/^ZD/, "m")
            .replace(/^ZHD/, "f")
            .replace(/^D/, "d")
            .replace(/^ZHG/, "t")
            .replace(/^ZG/, "n")
            .replace(/^HD/, "l")
            .replace(/^ZH/, "r")
            .replace(/^Z/, "zh")
            .replace(/^HGD/, "ch")
            .replace(/^GD/, "sh")
            .replace(/^G/, "g")
            .replace(/^HG/, "k")
            .replace(/^H/, "h")
            // 声母：jqx 组
            .replace(/^gY/, "jY")
            .replace(/^kY/, "qY")
            .replace(/^hY/, "xY")
            // 声母：平舌音
            .replace(/^([zcs])hY/, "$1")
            // 韵母
            //   -ng: -UN
            .replace(/AUN$/, "ang")
            .replace(/AEUN$/, "ong")
            .replace(/YUN$/, "ing")
            .replace(/UN$/, "eng")
            //   -i: -EN
            .replace(/AEN$/, "ai")
            .replace(/EN$/, "ei")
            //   -n: -N
            .replace(/AN$/, "an")
            .replace(/YN$/, "in")
            .replace(/YWN$/, "ün")
            .replace(/N$/, "en")
            //   -o/-u: -U
            .replace(/AU$/, "ao")
            .replace(/EU$/, "ou")
            //   零韵尾
            .replace(/A$/, "a")
            .replace(/AE$/, "o")
            .replace(/E$/, "e")

            //   韵腹
            .replace(/YW/, "ü")
            .replace(/Y/, "i")
            .replace(/W/, "u")

            // 拼写：零声母
            .replace(/^i(ng?)$/, "yi$1")
            .replace(/^i$/, "yi")
            .replace(/^i/, "y")
            .replace(/^u$/, "wu")
            .replace(/^u/, "w")
            .replace(/^ü$/, "yü")
            .replace(/^ü/, "yü")

            // 拼写：
            .replace(/([wu])e$/, "$1o")
            .replace(/uei$/, "ui")
            .replace(/iou$/, "iu")
            .replace(/uen$/, "un")
            .replace(/^([jqxy])ü/, "$1u")
            // .replace(/ü/, "v")

            // 零韵母速码
            .replace(/^([bpf])$/, "$1u")
            .replace(/^([mdtnlgkh])$/, "$1e")
            .replace(/^([zcsr]h?)$/, "$1i")
        );
        return py;
    },

    py2pm: function (pys) {
        function inner(py) {
            var pm = py
                // ⟨er⟩自成音節
                .replace(/^er$/, "ZGYWEN")

                // 零韵母速码
                .replace(/^([bpf])u$/, "$1")
                .replace(/^([mdtnlgkh])e$/, "$1")
                .replace(/^([zcs]h?|r)i$/, "$1")

                // 拼写：
                .replace(/v/, "ü")
                .replace(/^([jqxy])u/, "$1ü")
                .replace(/un$/, "uen")
                .replace(/iu$/, "iou")
                .replace(/ui$/, "uei")

                // 拼写：零声母
                .replace(/^yü/, "ü")
                .replace(/^wu$/, "u")
                .replace(/^w/, "u")
                .replace(/^yi$/, "i")
                .replace(/^yi(ng?)$/, "i$1")
                .replace(/^y/, "i")

                // 韵母
                //   -ng: -UN
                .replace(/ang$/, "AUN")
                .replace(/ong$/, "AEUN")
                .replace(/ing$/, "YUN")
                .replace(/eng$/, "UN")
                //   -i: -EN
                .replace(/ai$/, "AEN")
                .replace(/ei$/, "EN")
                //   -n: -N
                .replace(/an$/, "AN")
                .replace(/in$/, "YN")
                .replace(/ün$/, "YWN")
                .replace(/en$/, "N")
                //   -o/-u: -U
                .replace(/ao$/, "AU")
                .replace(/ou$/, "EU")
                //   零韵尾
                .replace(/a$/, "A")
                .replace(/o$/, "AE")
                .replace(/e$/, "E")

                //   韵腹
                .replace(/ü/, "YW")
                .replace(/u/, "W")
                .replace(/i/, "Y")

                // 声母：平舌音
                .replace(/^([zcs])$/, "$1hY")
                .replace(/^([zcs])([A-Z]+)$/, "$1hY$2")
                // 声母：jqx 组
                .replace(/^jY/, "gY")
                .replace(/^qY/, "kY")
                .replace(/^xY/, "hY")
                // 声母
                .replace(/^b/, "ZHGD")
                .replace(/^p/, "ZGD")
                .replace(/^m/, "ZD")
                .replace(/^f/, "ZHD")

                .replace(/^d/, "D")
                .replace(/^t/, "ZHG")
                .replace(/^n/, "ZG")
                .replace(/^l/, "HD")

                .replace(/^g/, "G")
                .replace(/^k/, "HG")
                .replace(/^h/, "H")

                .replace(/^zh/, "Z")
                .replace(/^ch/, "HGD")
                .replace(/^sh/, "GD")
                .replace(/^r/, "ZH")

                // formatting
                .replace(/([ZHGD])([YW])/, "$1-$2")
                .replace(/([YW])([AEUN])/, "$1-$2")
                .replace(/([ZHGD])([AEUN])/, "$1-$2")
            ;

            return pm;
        }
        let pms = pys.split('+').map(inner);
        return pms.join(' ');
    },

    split_pm: function(pm) {
        return pm.replace(/[\- ]/g, '').split('');
    },

});
