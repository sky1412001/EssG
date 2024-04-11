
const Skelton = () => {
  return (
 <SafeAreaView style={{padding:3}}>
<Animated.View
  style={{
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 10,
    backgroundColor: '#d0d0d0',
  }}>
  <Animated.View style={styles.headers}>
    <Animated.View>
      <Animated.View style={{ gap: -4 }}>
        <Animated.View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Animated.View style={{ flex: 1, backgroundColor: '#d0d0d0', height: 1 }} />
        </Animated.View>
        <Animated.View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Animated.View style={{ width: 100, height: 20, backgroundColor: '#d0d0d0' }} />
        </Animated.View>
      
      </Animated.View>
    </Animated.View>
  </Animated.View>
</Animated.View>
<Animated.View
        style={{
          top: -27,
          backgroundColor: 'white',
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          padding:2
        }}>

      <Animated.View style={{ width: Dimensions.get('window').width - 20,
    height: 120, backgroundColor:'#d0d0d0', alignSelf:'center', borderRadius:10 , marginTop:10}}>
    </Animated.View>
    <Animated.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionTwo}></Text>
          </Animated.View>
    <Animated.View style={{flexDirection:"row", marginTop:20}}>
<Animated.View
        style={{
          backgroundColor: 'white',
          elevation: 1,
          borderRadius: 10,
          flexDirection:"row"
        }}>
    <Animated.View style={styles.cardSkeleton}>
      <Animated.View style={styles.content}>
        <Animated.View style={styles.imageSkeleton} />
        <Animated.View style={styles.textContainer}>
          <Animated.View style={styles.titleSkeleton} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.subtitleButtonContainer}>
        
        <Animated.View style={styles.subtitleSkeleton} />
        <TouchableOpacity style={styles.addButtonSkeleton} />
      </Animated.View>
    </Animated.View>
    <Animated.View style={styles.cardSkeleton}>
      <Animated.View style={styles.content}>
        <Animated.View style={styles.imageSkeleton} />
        <Animated.View style={styles.textContainer}>
          <Animated.View style={styles.titleSkeleton} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.subtitleButtonContainer}>
        <Animated.View style={styles.subtitleSkeleton} />
        <TouchableOpacity style={styles.addButtonSkeleton}/>
      </Animated.View>
    </Animated.View>
    <Animated.View style={styles.cardSkeleton}>
      <Animated.View style={styles.content}>
        <Animated.View style={styles.imageSkeleton}/>
        <Animated.View style={styles.textContainer}>
          <Animated.View style={styles.titleSkeleton}/>
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.subtitleButtonContainer}>
        <Animated.View style={styles.subtitleSkeleton} />
        <TouchableOpacity style={styles.addButtonSkeleton}/>
      </Animated.View>
    </Animated.View>
</Animated.View>
    </Animated.View>
    <Animated.View style={{flexDirection: 'row', justifyContent: 'space-between',backgroundColor:'rgba(0,0,0,0)', height:40}}>
            <Text style={styles.sectionTwo}></Text>
          </Animated.View>
          <Animated.View style={{padding: 3, marginTop:30, backgroundColor:'#d0d0d0'}}>
          <Animated.View
            style={{
              gap: 7,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 3,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <Animated.View style={{width: 20, height: 10, backgroundColor:'#d0d0d0'}}/>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}>
            </Text>
            <Animated.View style={{backgroundColor: "#d0d0d0", width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
            <Animated.View style={{width: 20, height: 10, backgroundColor:'#d0d0d0'}} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}>
            </Text>
            <Animated.View style={{backgroundColor: "#d0d0d0", width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
            <Animated.View style={{width: 20, height: 10, backgroundColor:'#d0d0d0'}} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}>
            </Text>
            <Animated.View style={{backgroundColor: "#d0d0d0", width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
          </Animated.View>
          <Animated.View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor:"#d0d0d0"}}>
            <Text style={styles.sectionTwo}></Text>
          </Animated.View>
          <Animated.View style={{flexDirection:'row'}}>
          <Animated.View style={styles.container}>
            <Animated.View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Animated.View style={styles.card}>
          <Animated.View style={styles.content}>
            <Animated.View style={styles.textContainer}>
              <Text style={styles.title}></Text>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.subtitle}></Text>
            <TouchableOpacity
              
              style={{backgroundColor: '#d0d0d0', width: 21}}>
              <Text style={{color: COLORS.light, textAlign: 'center'}}></Text>
            </TouchableOpacity>
          </Animated.View>
            </Animated.View>
        <Animated.View style={styles.card}>
          <Animated.View style={styles.content}>
            <Animated.View style={styles.textContainer}>
              <Text style={styles.title}></Text>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.subtitle}></Text>
            <TouchableOpacity
              
              style={{backgroundColor: '#d0d0d0', width: 21}}>
              <Text style={{color: COLORS.light, textAlign: 'center'}}></Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        </Animated.View>
       
      </Animated.View>
          </Animated.View>
 </SafeAreaView>
  );
};