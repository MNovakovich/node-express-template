function Module(options) {
    console.log('options', options)
    return (target) => { console.log('@:', target)}
}

@Module({})
class Test {

}