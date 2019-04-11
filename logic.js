/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fordham.education.ModifyTranscript} modify - the trade to be processed
 * @transaction
 */

async function modifyTranscript(modify){
    const Assetregistry=await getAssetRegistry('org.fordham.education.Transcript');
    //const participantRegistryS = await getParticipantRegistry('org.fordham.education'+'Student');
    // const participantRegistryC = await getParticipantRegistry('org.fordham.education.Company');
    // const participantRegistrySC = await getParticipantRegistry('org.fordham.education.School'); // eslint-disable-line no-undef
    const factory=getFactory();
    const newasset=factory.newResource('org.fordham.education','Transcript',modify.mId);
    //modify aspects
    newasset.gpa=modify.gpa;
    newasset.remarks=modify.remarks;
    newasset.studentName=modify.studentName;
    newasset.studentId=modify.studentId;
    newasset.GraduationDate=modify.GraduationDate;
    newasset.issueDate=modify.issueDate;
    //participants
    const SchoolRef=factory.newRelationship('org.fordham.education','School',getCurrentParticipant().getIdentifier());
    newasset.school=SchoolRef; 
    //const toStudent = await participantRegistryS.get(modify.student);
    const StudentRef=factory.newRelationship('org.fordham.education','Student',getCurrentParticipant().getIdentifier());
    newasset.student=StudentRef; 
  	const CompanyRef=factory.newRelationship('org.fordham.education','Company',getCurrentParticipant().getIdentifier());
    newasset.viewedBy=CompanyRef; 

  await Assetregistry.add(newasset);
  

}
